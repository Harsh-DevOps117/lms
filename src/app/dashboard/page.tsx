"use client";
import { coreApi } from "@/api/client";
import { AllUsersView } from "@/components/dashboard/superadmin/AllUsersView";
import { GlobalAnalyticsView } from "@/components/dashboard/superadmin/GlobalAnalyticsView";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuthStore } from "@/store/authStore";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
const LocationDisplay = ({ location }: { location: string }) => {
  const [displayLoc, setDisplayLoc] = useState(location);
  useEffect(() => {
    if (location && location.includes(",") && /[0-9]/.test(location)) {
      const [lat, lon] = location.split(",").map((s) => s.trim());
      if (!isNaN(Number(lat)) && !isNaN(Number(lon))) {
        fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10`,
        )
          .then((res) => res.json())
          .then((data) => {
            const city =
              data.address?.city ||
              data.address?.town ||
              data.address?.state ||
              location;
            setDisplayLoc(city);
          })
          .catch(() => setDisplayLoc(location));
      }
    } else {
      setDisplayLoc(location);
    }
  }, [location]);
  return <>{displayLoc}</>;
};
function DashboardContent() {
  const { token, roleId, userId } = useAuthStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = searchParams?.get("tab") || "academy";
  const containerRef = useRef<HTMLDivElement>(null);
  const [analytics, setAnalytics] = useState<any>(null);
  const [payouts, setPayouts] = useState<any>(null);
  const [teachers, setTeachers] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[] | null>(null);
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<number | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [teacherAiResponse, setTeacherAiResponse] = useState<string | null>(null);
  const [isTeacherAskingAi, setIsTeacherAskingAi] = useState(false);
  const [studentAiResponse, setStudentAiResponse] = useState<string | null>(null);
  const [isStudentAskingAi, setIsStudentAskingAi] = useState(false);
  const [globalAnalytics, setGlobalAnalytics] = useState<any>(null);
  const [globalUsers, setGlobalUsers] = useState<any[]>([]);
  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);
  const fetchGlobalUsers = () => {
    coreApi
      .get("/admin/users")
      .then((res) => setGlobalUsers(res.data))
      .catch(console.error);
  };
  useEffect(() => {
    if (userId) {
      coreApi
        .get(`/users/${userId}`)
        .then((res) => setProfile(res.data))
        .catch(console.error);
    }
  }, [userId]);
  useEffect(() => {
    if (roleId === 4) {
      if (currentTab === "global_analytics") {
        coreApi
          .get("/admin/analytics")
          .then((res) => setGlobalAnalytics(res.data))
          .catch(console.error);
      }
      if (currentTab === "all_users") {
        fetchGlobalUsers();
      }
      return;
    }
    if (!profile) return;
    const tId = profile.tenant_id;
    if (roleId === 1 || roleId === 2) {
      if (currentTab === "courses" || currentTab === "assignments" || currentTab === "academy") {
        coreApi
          .get(`/tenants/${tId}/courses`)
          .then((res) => setCourses(res.data))
          .catch(console.error);
      }
    }
    if (roleId === 1) {
      if (currentTab === "performance" || currentTab === "analytics") {
        coreApi
          .get(`/tenants/${tId}/analytics`)
          .then((res) => setAnalytics(res.data))
          .catch(console.error);
        coreApi
          .get(`/payments/payouts/${tId}`)
          .then((res) => setPayouts(res.data))
          .catch(console.error);
      } else if (currentTab === "teachers") {
        coreApi
          .get(`/tenants/${tId}/teachers`)
          .then((res) => setTeachers(res.data))
          .catch(console.error);
      }
    }
  }, [currentTab, roleId, profile]); 
  useEffect(() => {
    const action = searchParams?.get("action");
    if (action === "create_course") {
      setIsCourseModalOpen(true);
      const url = new URL(window.location.href);
      url.searchParams.delete("action");
      window.history.replaceState({}, "", url.toString());
    }
  }, [searchParams]);
  // GSAP Smooth Motion
  useGSAP(
    () => {
      if (containerRef.current) {
        const elements =
          containerRef.current.querySelectorAll(".gsap-stagger-item");
        gsap.fromTo(
          elements,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" },
        );
      }
    },
    { dependencies: [currentTab], scope: containerRef },
  );
  if (!token) return null;
  let roleName = "Student";
  if (roleId === 1) roleName = "Tenant";
  if (roleId === 2) roleName = "Teacher";
  if (roleId === 4) roleName = "SuperAdmin";
  const handleUpdateSettings = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      await coreApi.put("/users/1/payment-details", {
        upi_id: formData.get("upi_id"),
        razorpay_account_id: formData.get("razorpay_account_id"),
      });
      const tId = profile?.tenant_id || 1;
      await coreApi.put(`/tenants/${tId}/domain`, {
        custom_domain: formData.get("custom_domain"),
        ssl_enabled: true,
      });
      toast.success("Settings updated successfully!");
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Failed to update settings");
    }
  };
  const handleDeleteUser = async (id: number) => {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        await coreApi.delete(`/admin/users/${id}`);
        toast.success("User deleted successfully");
        fetchGlobalUsers();
      } catch (err: any) {
        toast.error(err.response?.data?.error || "Failed to delete user");
      }
    }
  };
  const handleDeleteCourse = (courseId: number) => {
    setCourseToDelete(courseId);
  };
  const confirmDeleteCourse = async () => {
    if (!courseToDelete) return;
    try {
      await coreApi.delete(`/courses/${courseToDelete}`);
      toast.success("Course deleted successfully!");
      if (profile) {
        const res = await coreApi.get(`/tenants/${profile.tenant_id}/courses`);
        setCourses(res.data);
      }
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Failed to delete course");
    } finally {
      setCourseToDelete(null);
    }
  };
  return (
    <div ref={containerRef} className="space-y-12">
      <header className="border-b-2 border-gray-200 pb-6 gsap-stagger-item">
        <h1 className="font-display text-[48px] md:text-[64px] uppercase text-black leading-[0.9]">
          WELCOME BACK{" "}
          {profile?.first_name ? profile.first_name.toUpperCase() : ""}
        </h1>
        <p className="font-ui text-[16px] text-gray-500 mt-4 uppercase font-semibold tracking-widest">
          You are logged in as <span className="text-black">{roleName}</span>.
        </p>
      </header>
      {currentTab === "profile" && (
        <section className="space-y-6">
          <div className="flex justify-between items-center gsap-stagger-item">
            <h2 className="font-ui font-bold text-[24px] text-black leading-[1.2] uppercase tracking-widest">
              My Profile
            </h2>
          </div>
          {profile ? (
            <div className="bg-white w-full gsap-stagger-item border-2 border-black">
              <div className="flex flex-col md:flex-row">
                {}
                <div className="flex flex-col items-center justify-center p-10 md:p-14 md:w-1/3 bg-white border-b-2 md:border-b-2-0 md:border-r-2 border-gray-200">
                  <div className="w-32 h-32 bg-black text-white flex items-center justify-center font-display text-[64px] uppercase shrink-0 mb-6">
                    {profile.first_name ? profile.first_name.charAt(0) : "?"}
                  </div>
                  <h3 className="font-ui font-bold text-[24px] text-black text-center uppercase tracking-widest">
                    {profile.first_name || "N/A"} {profile.last_name || ""}
                  </h3>
                  <span className="mt-4 inline-block px-4 py-1.5 border-2 border-black font-ui text-[12px] font-semibold uppercase tracking-widest text-black bg-white">
                    {roleName}
                  </span>
                </div>
                {}
                <div className="flex-1 w-full p-10 md:p-14 space-y-8">
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2 border-b-2 border-gray-200 pb-4">
                      <p className="font-ui text-[12px] font-semibold uppercase tracking-widest text-gray-500">
                        Email Address
                      </p>
                      <p className="font-ui text-[20px] font-bold text-black">
                        {profile.email || "N/A"}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 border-b-2 border-gray-200 pb-4">
                      <p className="font-ui text-[12px] font-semibold uppercase tracking-widest text-gray-500">
                        Phone Number
                      </p>
                      <p className="font-ui text-[20px] font-bold text-black">
                        {profile.phone || "N/A"}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 border-b-2 border-gray-200 pb-4">
                      <p className="font-ui text-[12px] font-semibold uppercase tracking-widest text-gray-500">
                        Location
                      </p>
                      <p className="font-ui text-[20px] font-bold text-black uppercase">
                        {profile.location ? (
                          <LocationDisplay location={profile.location} />
                        ) : (
                          "N/A"
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white p-8 md:p-12 w-full gsap-stagger-item animate-pulse border-2 border-black">
              <div className="flex flex-col md:flex-row gap-10 items-start">
                <div className="w-24 h-24 bg-gray-200 border-2 border-black shrink-0"></div>
                <div className="flex-1 w-full space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className={`space-y-2 border-b-2 border-gray-200 pb-4 ${i === 5 ? "md:col-span-2" : ""}`}
                      >
                        <div className="h-3 w-1/3 bg-gray-200"></div>
                        <div className="h-5 w-2/3 bg-gray-300"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      )}
      {roleName === "Tenant" && (
        <div className="space-y-6">
          {currentTab === "academy" && (
            <section className="space-y-6">
              <h2 className="font-ui font-bold text-[24px] text-black leading-[1.2] uppercase tracking-widest gsap-stagger-item">
                Academy Management
              </h2>
              <div className="bg-white p-8 border-2 border-black gsap-stagger-item">
                <h3 className="font-ui font-bold text-[16px] text-black mb-2 uppercase tracking-widest">
                  Create / Update Academy
                </h3>
                <p className="font-ui text-[14px] text-gray-500 mb-6 font-semibold uppercase tracking-widest">
                  Initialize your academy details.
                </p>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    try {
                      const name = formData.get("academy_name") as string;
                      const emailPart = profile?.email
                        ? profile.email
                            .split("@")[0]
                            .toLowerCase()
                            .replace(/[^a-z0-9]+/g, "")
                        : userId;
                      const slug =
                        name.toLowerCase().replace(/[^a-z0-9]+/g, "-") +
                        "-" +
                        emailPart;
                      await coreApi.post("/tenants", {
                        owner_user_id: userId,
                        academy_name: name,
                        academy_slug: slug,
                      });
                      const updatedProfile = await coreApi.get(
                        `/users/${userId}`,
                      );
                      setProfile(updatedProfile.data);
                      toast.success("Academy created successfully!");
                      (e.target as HTMLFormElement).reset();
                    } catch (err: any) {
                      toast.error(
                        err.response?.data?.error || "Failed to create academy",
                      );
                    }
                  }}
                  className="flex flex-col gap-4"
                >
                  <div className="grid grid-cols-1 gap-4">
                    <input
                      required
                      name="academy_name"
                      type="text"
                      placeholder="Academy Name (e.g. Nike Design)"
                      className="w-full bg-[#f4f4f5] text-black px-4 py-3 border-2 border-black outline-none font-ui text-[14px] focus:translate-y-[2px] focus:translate-x-[2px] transition-all"
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="primary"
                    className="bg-[#1ED760] hover:bg-[#18B24E] text-black border-2 border-black rounded-none uppercase tracking-widest font-bold"
                  >
                    Create Academy
                  </Button>
                </form>
              </div>
              <div className="bg-white p-8 border-2 border-black gsap-stagger-item mt-6">
                <h3 className="font-ui font-bold text-[16px] text-black mb-2 uppercase tracking-widest">
                  Update Branding
                </h3>
                <p className="font-ui text-[14px] text-gray-500 mb-6 font-semibold uppercase tracking-widest">
                  Set your academy logo and banner files.
                </p>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setIsUploading(true);
                    const formData = new FormData(e.currentTarget);
                    try {
                      const logoFile = formData.get("logo") as File;
                      const bannerFile = formData.get("banner") as File;
                      const instructorPicFile = formData.get(
                        "instructor_pic",
                      ) as File;
                      let logo_url = "";
                      let banner_url = "";
                      let instructor_pic_url = "";
                      if (logoFile && logoFile.size > 0) {
                        const logoData = new FormData();
                        logoData.append("file", logoFile);
                        logoData.append("slug", profile?.academy_slug || "");
                        logoData.append("phone", profile?.phone || "");
                        logoData.append("category", "branding/logo");
                        const logoRes = await coreApi.post(
                          "/upload",
                          logoData,
                          {
                            headers: { "Content-Type": "multipart/form-data" },
                          },
                        );
                        logo_url = logoRes.data.url;
                      }
                      if (bannerFile && bannerFile.size > 0) {
                        const bannerData = new FormData();
                        bannerData.append("file", bannerFile);
                        bannerData.append("slug", profile?.academy_slug || "");
                        bannerData.append("phone", profile?.phone || "");
                        bannerData.append("category", "branding/banner");
                        const bannerRes = await coreApi.post(
                          "/upload",
                          bannerData,
                          {
                            headers: { "Content-Type": "multipart/form-data" },
                          },
                        );
                        banner_url = bannerRes.data.url;
                      }
                      if (instructorPicFile && instructorPicFile.size > 0) {
                        const picData = new FormData();
                        picData.append("file", instructorPicFile);
                        picData.append("slug", profile?.academy_slug || "");
                        picData.append("phone", profile?.phone || "");
                        picData.append("category", "branding/instructor");
                        const picRes = await coreApi.post("/upload", picData, {
                          headers: { "Content-Type": "multipart/form-data" },
                        });
                        instructor_pic_url = picRes.data.url;
                        await coreApi.put(`/users/${userId}/profile-image`, {
                          profile_image_url: instructor_pic_url,
                        });
                      }
                      const tId = profile?.tenant_id || 1;
                      await coreApi.put(`/tenants/${tId}/branding`, {
                        logo_url,
                        banner_url,
                      });
                      const updatedProfile = await coreApi.get(
                        `/users/${userId}`,
                      );
                      setProfile(updatedProfile.data);
                      toast.success("Branding updated successfully!");
                      (e.target as HTMLFormElement).reset();
                    } catch (err: any) {
                      toast.error(
                        err.response?.data?.error ||
                          "Failed to update branding",
                      );
                    } finally {
                      setIsUploading(false);
                    }
                  }}
                  className="flex flex-col gap-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[12px] font-bold uppercase tracking-widest mb-1">
                        Logo
                      </label>
                      <input
                        name="logo"
                        type="file"
                        accept="image/*"
                        className="block w-full text-[14px] text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-2 file:border-gray-200 file:text-[14px] file:font-semibold file:uppercase file:tracking-widest file:bg-black file:text-white hover:file:bg-gray-800 cursor-pointer bg-white border-2 border-black p-1"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] font-bold uppercase tracking-widest mb-1">
                        Banner
                      </label>
                      <input
                        name="banner"
                        type="file"
                        accept="image/*"
                        className="block w-full text-[14px] text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-2 file:border-gray-200 file:text-[14px] file:font-semibold file:uppercase file:tracking-widest file:bg-black file:text-white hover:file:bg-gray-800 cursor-pointer bg-white border-2 border-black p-1"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] font-bold uppercase tracking-widest mb-1">
                        Instructor Photo
                      </label>
                      <input
                        name="instructor_pic"
                        type="file"
                        accept="image/*"
                        className="block w-full text-[14px] text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-2 file:border-gray-200 file:text-[14px] file:font-semibold file:uppercase file:tracking-widest file:bg-black file:text-white hover:file:bg-gray-800 cursor-pointer bg-white border-2 border-black p-1"
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isUploading}
                    className="bg-[#1ED760] hover:bg-[#18B24E] text-black border-2 border-black rounded-none uppercase tracking-widest font-bold mt-2 disabled:opacity-50"
                  >
                    {isUploading ? "Uploading..." : "Save Branding"}
                  </Button>
                </form>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-white p-8 border-2 border-black gsap-stagger-item">
                  <h3 className="font-ui font-bold text-[16px] text-black mb-2 uppercase tracking-widest">
                    Invite Teachers
                  </h3>
                  <p className="font-ui text-[14px] text-gray-500 mb-6 font-semibold uppercase tracking-widest">
                    Grow your academy by inviting experienced educators.
                  </p>
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      const formData = new FormData(e.currentTarget);
                      const tId = profile?.tenant_id || 1;
                      const courseIdStr = formData.get("courseId") as string;
                      const payload: any = {
                        email: formData.get("email"),
                        role_id: 2,
                      };
                      if (courseIdStr) {
                        payload.course_id = parseInt(courseIdStr);
                      }
                      try {
                        await coreApi.post(
                          `/tenants/${tId}/invitations`,
                          payload,
                        );
                        toast.success("Invitation sent successfully!");
                        (e.target as HTMLFormElement).reset();
                      } catch (err: any) {
                        toast.error(
                          err.response?.data?.error || "Failed to send invite",
                        );
                      }
                    }}
                    className="flex flex-col gap-4"
                  >
                    <input
                      required
                      type="email"
                      name="email"
                      placeholder="teacher@example.com"
                      className="w-full bg-[#f4f4f5] text-black px-4 py-3 border-2 border-black outline-none font-ui text-[14px] focus:translate-y-[2px] focus:translate-x-[2px] transition-all"
                    />
                    <select
                      name="courseId"
                      className="block w-full border-2 border-black p-3 text-[14px] font-bold uppercase tracking-widest bg-white"
                    >
                      <option value="">No Course (Tenant Level)</option>
                      {courses?.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.title}
                        </option>
                      ))}
                    </select>
                    <Button
                      type="submit"
                      variant="primary"
                      className="bg-[#1ED760] hover:bg-[#18B24E] text-black border-2 border-black rounded-none uppercase tracking-widest font-bold"
                    >
                      Send Invitation
                    </Button>
                  </form>
                </div>
              </div>
            </section>
          )}
          {currentTab === "templates" && (
            <section className="space-y-6">
              <h2 className="font-ui font-bold text-[24px] text-black leading-[1.2] uppercase tracking-widest gsap-stagger-item">
                Website Templates
              </h2>
              <p className="font-ui text-[14px] text-gray-500 mb-6 font-semibold uppercase tracking-widest gsap-stagger-item">
                Choose a template for your academy website. Your students will
                see this design.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-8 border-4 border-[#1ED760] gsap-stagger-item cursor-pointer hover:translate-y-[-2px] transition-transform relative">
                  <div className="absolute top-4 right-4 bg-[#1ED760] text-black px-3 py-1 text-[10px] font-bold uppercase tracking-widest border-2 border-black">
                    Active
                  </div>
                  <div className="h-32 bg-black mb-6 border-2 border-black flex items-center justify-center">
                    <span className="text-[#1ED760] font-display text-[24px] uppercase">
                      Brutalist Dark
                    </span>
                  </div>
                  <h3 className="font-ui font-bold text-[18px] text-black mb-2 uppercase tracking-widest">
                    Brutalist Dark
                  </h3>
                  <p className="font-ui text-[14px] text-gray-500 mb-6 font-semibold uppercase tracking-widest">
                    A high-contrast, edgy template perfect for modern academies.
                  </p>
                  <div className="flex gap-4">
                    <Button
                      variant="primary"
                      disabled
                      className="bg-[#1ED760] text-black border-2 border-black rounded-none uppercase tracking-widest font-bold w-1/2 opacity-80 cursor-default"
                    >
                      Active
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(
                          `/${profile?.academy_slug || ""}`,
                          "_blank",
                        );
                      }}
                      className="bg-black text-white hover:bg-gray-800 border-2 border-black rounded-none uppercase tracking-widest font-bold w-1/2"
                    >
                      View Live
                    </Button>
                  </div>
                </div>
              </div>
            </section>
          )}
          {currentTab === "performance" && (
            <section className="space-y-6">
              <h2 className="font-ui font-bold text-[24px] text-black leading-[1.2] uppercase tracking-widest gsap-stagger-item">
                Performance & Payout Metrics
              </h2>
              {analytics && payouts ? (
                <>
                  <div className="bg-black text-white border-2 border-black p-8 mb-6 gsap-stagger-item">
                    <p className="font-ui text-[14px] text-gray-400 mb-2 font-semibold uppercase tracking-widest">
                      AI Summary
                    </p>
                    <p className="font-ui text-[16px] leading-[1.5] font-medium">
                      {analytics.ai_summary}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white border-2 border-black p-8 gsap-stagger-item">
                      <p className="font-ui text-[14px] text-gray-500 mb-2 font-semibold uppercase tracking-widest">
                        Gross Revenue
                      </p>
                      <p className="font-display text-[48px] text-black leading-none">
                        ₹{payouts.total_revenue}
                      </p>
                    </div>
                    <div className="bg-white border-2 border-black p-8 gsap-stagger-item">
                      <p className="font-ui text-[14px] text-gray-500 mb-2 font-semibold uppercase tracking-widest">
                        Tenant Net (80%)
                      </p>
                      <p className="font-display text-[48px] text-green-600 leading-none">
                        ₹{payouts.tenant_net}
                      </p>
                    </div>
                    <div className="bg-white border-2 border-black p-8 gsap-stagger-item">
                      <p className="font-ui text-[14px] text-gray-500 mb-2 font-semibold uppercase tracking-widest">
                        Active Students
                      </p>
                      <p className="font-display text-[48px] text-black leading-none">
                        {analytics.total_students}
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="font-ui text-gray-500 font-semibold uppercase tracking-widest gsap-stagger-item">
                  Loading analytics...
                </div>
              )}
            </section>
          )}
          {currentTab === "settings" && (
            <section className="space-y-6">
              <h2 className="font-ui font-bold text-[24px] text-black leading-[1.2] uppercase tracking-widest gsap-stagger-item">
                Academy Settings & Payout Details
              </h2>
              <div className="bg-white border-2 border-black p-8 w-full gsap-stagger-item">
                <form
                  onSubmit={handleUpdateSettings}
                  className="flex flex-col gap-6"
                >
                  <div>
                    <label className="block font-ui text-[14px] text-black font-semibold uppercase tracking-widest mb-2">
                      Custom Domain
                    </label>
                    <input
                      name="custom_domain"
                      type="text"
                      placeholder="learn.yourdomain.com"
                      className="w-full bg-[#f4f4f5] text-black px-4 py-3 border-2 border-black outline-none font-ui text-[14px] focus:translate-y-[2px] focus:translate-x-[2px] transition-all"
                    />
                  </div>
                  <hr className="border-[1px] border-gray-200" />
                  <div>
                    <label className="block font-ui text-[14px] text-black font-semibold uppercase tracking-widest mb-2">
                      UPI ID (For Payouts)
                    </label>
                    <input
                      name="upi_id"
                      type="text"
                      placeholder="yourname@upi"
                      className="w-full bg-[#f4f4f5] text-black px-4 py-3 border-2 border-black outline-none font-ui text-[14px] focus:translate-y-[2px] focus:translate-x-[2px] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block font-ui text-[14px] text-black font-semibold uppercase tracking-widest mb-2">
                      Razorpay Account ID (For 80/20 Split)
                    </label>
                    <input
                      name="razorpay_account_id"
                      type="text"
                      placeholder="acc_XXXXXXXXXXXX"
                      className="w-full bg-[#f4f4f5] text-black px-4 py-3 border-2 border-black outline-none font-ui text-[14px] focus:translate-y-[2px] focus:translate-x-[2px] transition-all"
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="primary"
                    className="border-2 border-black rounded-none uppercase tracking-widest font-bold mt-2"
                  >
                    Save Changes
                  </Button>
                </form>
              </div>
            </section>
          )}
          {currentTab === "courses" && (
            <section className="space-y-6">
              <div className="flex justify-between items-center gsap-stagger-item">
                <h2 className="font-ui font-bold text-[24px] text-black leading-[1.2] uppercase tracking-widest">
                  Manage Courses
                </h2>
                <Button
                  variant="primary"
                  onClick={() => setIsCourseModalOpen(true)}
                  className="bg-[#1ED760] hover:bg-[#18B24E] text-black border-2 border-black rounded-none uppercase tracking-widest font-bold"
                >
                  Create New Course
                </Button>
              </div>
              <div className="bg-white p-8 border-2 border-black gsap-stagger-item overflow-hidden">
                <table className="w-full text-left font-ui">
                  <thead>
                    <tr className="border-b-2 border-gray-200 text-[14px] text-black font-semibold uppercase tracking-widest">
                      <th className="pb-4">Course Name</th>
                      <th className="pb-4">Status</th>
                      <th className="pb-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses?.map((c, idx) => (
                      <tr
                        key={idx}
                        className="border-b-2 border-gray-200 text-[14px] text-black transition-colors hover:bg-gray-100 font-semibold uppercase tracking-widest"
                      >
                        <td className="py-4">{c.title}</td>
                        <td className="py-4">
                          <span className="bg-black text-white px-3 py-1 text-[12px]">
                            {c.is_published ? "Published" : "Draft"}
                          </span>
                        </td>
                        <td className="py-4 text-right flex justify-end gap-4 items-center">
                          <button 
                            onClick={() => handleDeleteCourse(c.id)}
                            className="text-red-500 hover:text-red-700 font-bold underline"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                    {(!courses || courses.length === 0) && (
                      <tr>
                        <td
                          colSpan={3}
                          className="py-4 text-center text-gray-500 font-semibold uppercase tracking-widest"
                        >
                          No courses found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          )}
          {currentTab === "teachers" && (
            <section className="space-y-6">
              <div className="flex justify-between items-center gsap-stagger-item">
                <h2 className="font-ui font-bold text-[24px] text-black leading-[1.2] uppercase tracking-widest">
                  Recruited Teachers
                </h2>
              </div>
              <div className="bg-white p-8 border-2 border-black gsap-stagger-item">
                <table className="w-full text-left font-ui">
                  <thead>
                    <tr className="border-b-2 border-gray-200 text-[14px] text-black font-semibold uppercase tracking-widest">
                      <th className="pb-4">Name</th>
                      <th className="pb-4">Email</th>
                      <th className="pb-4">Payout UPI ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teachers?.map((t, idx) => (
                      <tr
                        key={idx}
                        className="border-b-2 border-gray-200 text-[14px] text-black font-semibold uppercase tracking-widest hover:bg-gray-100 transition-colors"
                      >
                        <td className="py-4">{t.name}</td>
                        <td className="py-4">{t.email}</td>
                        <td className="py-4 text-gray-500">
                          {t.upi_id || "Not Set"}
                        </td>
                      </tr>
                    ))}
                    {(!teachers || teachers.length === 0) && (
                      <tr>
                        <td
                          colSpan={3}
                          className="py-4 text-center text-gray-500 font-semibold uppercase tracking-widest"
                        >
                          No teachers recruited yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </div>
      )}
      {roleName === "Teacher" && (
        <div className="space-y-6">
          {currentTab === "courses" && (
            <section className="space-y-6">
              <h2 className="font-ui font-bold text-[24px] text-black leading-[1.2] uppercase tracking-widest gsap-stagger-item">
                My Courses
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {courses?.map((c, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-8 border-2 border-black flex flex-col justify-between gsap-stagger-item"
                  >
                    <div className="mb-6">
                      <h3 className="font-ui font-bold text-[16px] text-black uppercase tracking-widest">
                        {c.title}
                      </h3>
                      <p className="font-ui text-[14px] text-gray-500 mt-1 font-semibold uppercase tracking-widest">
                        Status: {c.is_published ? "Published" : "Draft"}
                      </p>
                    </div>
                    <Button
                      variant="secondary"
                      className="bg-[#00D084] hover:bg-[#00B372] text-black border-2 border-black rounded-none uppercase tracking-widest font-bold w-full"
                    >
                      Manage Content
                    </Button>
                  </div>
                ))}
                {(!courses || courses.length === 0) && (
                  <div className="col-span-1 md:col-span-2 text-center text-gray-500 font-semibold uppercase tracking-widest py-8 border-2 border-black border-dashed bg-white">
                    No courses available yet.
                  </div>
                )}
                <div className="bg-white p-8 border-2 border-black gsap-stagger-item md:col-span-2 mt-4">
                  <h3 className="font-ui font-bold text-[16px] text-black mb-2 uppercase tracking-widest">
                    Upload Course Video/Thumbnail
                  </h3>
                  <p className="font-ui text-[14px] text-gray-500 mb-6 font-semibold uppercase tracking-widest">
                    Add new media to your course.
                  </p>
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      setIsUploading(true);
                      const formData = new FormData(e.currentTarget);
                      try {
                        const courseId = formData.get("courseId") as string;
                        const title = formData.get("title") as string;
                        const videoFile = formData.get("videoFile") as File;
                        const thumbnailFile = formData.get("thumbnailFile") as File;
                        const noteFile = formData.get("noteFile") as File;
                        if (!courseId) {
                          toast.error("Please select a course.");
                          setIsUploading(false);
                          return;
                        }
                        if (!videoFile || videoFile.size === 0) {
                          toast.error("Please select a video file to upload.");
                          setIsUploading(false);
                          return;
                        }
                        if (!title) {
                          toast.error("Please provide a title for the video lecture.");
                          setIsUploading(false);
                          return;
                        }
                        if (thumbnailFile && thumbnailFile.size > 0) {
                          const thumbData = new FormData();
                          thumbData.append("file", thumbnailFile);
                          thumbData.append("slug", profile?.tenant?.slug || "academy");
                          thumbData.append("category", `thumbnails/${courseId}`);
                          const thumbRes = await coreApi.post("/upload", thumbData, {
                            headers: { "Content-Type": "multipart/form-data" },
                          });
                          await coreApi.put(`/courses/${courseId}`, {
                            thumbnail_url: thumbRes.data.url,
                          });
                          toast.success("Thumbnail uploaded successfully!");
                        }
                        const videoData = new FormData();
                        videoData.append("file", videoFile);
                        videoData.append("slug", profile?.tenant?.slug || "academy");
                        videoData.append("category", `videos/${courseId}`);
                        const videoRes = await coreApi.post("/upload", videoData, {
                          headers: { "Content-Type": "multipart/form-data" },
                        });
                        let noteUrl = "";
                        if (noteFile && noteFile.size > 0) {
                          const noteData = new FormData();
                          noteData.append("file", noteFile);
                          noteData.append("slug", profile?.tenant?.slug || "academy");
                          noteData.append("category", `notes/${courseId}`);
                          const noteRes = await coreApi.post("/upload", noteData, {
                            headers: { "Content-Type": "multipart/form-data" },
                          });
                          noteUrl = noteRes.data.url;
                        }
                        await coreApi.post(`/courses/${courseId}/videos`, {
                          tenant_id: profile?.tenant_id || 1,
                          teacher_id: profile?.id || 1,
                          title: title,
                          video_url: videoRes.data.url,
                          note_url: noteUrl,
                          description: "",
                        });
                        toast.success("Video lecture uploaded and saved successfully!");
                        (e.target as HTMLFormElement).reset();
                      } catch (err: any) {
                        toast.error(
                          err.response?.data?.error || "Upload failed",
                        );
                      } finally {
                        setIsUploading(false);
                      }
                    }}
                    className="flex flex-col gap-4"
                  >
                    <select
                      name="courseId"
                      className="block w-full border-2 border-black p-3 text-[14px] font-bold uppercase tracking-widest bg-white"
                      required
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select a Course
                      </option>
                      {courses?.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.title}
                        </option>
                      ))}
                    </select>
                    <Input
                      name="title"
                      required
                      placeholder="Lecture Title"
                      className="!bg-white !text-black !rounded-none !border-2 !border-black focus:!ring-0 focus:!border-gray-500"
                    />
                    <div>
                      <label className="block text-[12px] font-bold uppercase tracking-widest mb-1">
                        Lecture Video (Required)
                      </label>
                      <input
                        required
                        name="videoFile"
                        type="file"
                        accept="video/mp4,video/ts,video/quicktime"
                        className="block w-full text-[14px] text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-2 file:border-gray-200 file:text-[14px] file:font-semibold file:uppercase file:tracking-widest file:bg-black file:text-white hover:file:bg-gray-800 cursor-pointer bg-white border-2 border-black p-1"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] font-bold uppercase tracking-widest mb-1">
                        Course Thumbnail (Optional)
                      </label>
                      <input
                        name="thumbnailFile"
                        type="file"
                        accept="image/jpeg,image/png"
                        className="block w-full text-[14px] text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-2 file:border-gray-200 file:text-[14px] file:font-semibold file:uppercase file:tracking-widest file:bg-black file:text-white hover:file:bg-gray-800 cursor-pointer bg-white border-2 border-black p-1"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] font-bold uppercase tracking-widest mb-1">
                        Lecture Notes PDF (Optional)
                      </label>
                      <input
                        name="noteFile"
                        type="file"
                        accept="application/pdf"
                        className="block w-full text-[14px] text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-2 file:border-gray-200 file:text-[14px] file:font-semibold file:uppercase file:tracking-widest file:bg-black file:text-white hover:file:bg-gray-800 cursor-pointer bg-white border-2 border-black p-1"
                      />
                    </div>
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={isUploading}
                      className="bg-[#1ED760] hover:bg-[#18B24E] text-black border-2 border-black rounded-none uppercase tracking-widest font-bold mt-2 disabled:opacity-50"
                    >
                      {isUploading ? "Uploading Media..." : "Upload Lecture"}
                    </Button>
                  </form>
                </div>
              </div>
            </section>
          )}
          {currentTab === "assignments" && (
            <section className="space-y-6">
              <h2 className="font-ui font-bold text-[24px] text-black leading-[1.2] uppercase tracking-widest gsap-stagger-item">
                Assignments
              </h2>
              <div className="bg-white p-8 border-2 border-black gsap-stagger-item w-full">
                <h3 className="font-ui font-bold text-[16px] text-black mb-2 uppercase tracking-widest">
                  Create New Assignment
                </h3>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setIsUploading(true);
                    const formData = new FormData(e.currentTarget);
                    const courseId = formData.get("courseId") as string;
                    const attachmentFile = formData.get("attachmentFile") as File;
                    if (!courseId) {
                      toast.error("Please select a course.");
                      setIsUploading(false);
                      return;
                    }
                    try {
                      let attachmentUrl = "";
                      if (attachmentFile && attachmentFile.size > 0) {
                        const fileData = new FormData();
                        fileData.append("file", attachmentFile);
                        fileData.append("slug", profile?.tenant?.slug || "academy");
                        fileData.append("category", `assignments/${courseId}`);
                        const fileRes = await coreApi.post("/upload", fileData, {
                          headers: { "Content-Type": "multipart/form-data" },
                        });
                        attachmentUrl = fileRes.data.url;
                      }
                      await coreApi.post(`/courses/${courseId}/assignments`, {
                        tenant_id: profile?.tenant_id || 1,
                        teacher_id: profile?.id || 1,
                        title: formData.get("title"),
                        description: formData.get("description"),
                        attachment_url: attachmentUrl,
                      });
                      toast.success("Assignment created successfully!");
                      (e.target as HTMLFormElement).reset();
                    } catch (err: any) {
                      toast.error(
                        err.response?.data?.error ||
                          "Failed to create assignment",
                      );
                    } finally {
                      setIsUploading(false);
                    }
                  }}
                  className="flex flex-col gap-4"
                >
                  <select
                    name="courseId"
                    className="block w-full border-2 border-black p-3 text-[14px] font-bold uppercase tracking-widest bg-white"
                    required
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select a Course
                    </option>
                    {courses?.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                  <input
                    required
                    name="title"
                    type="text"
                    placeholder="Assignment Title"
                    className="w-full bg-[#f4f4f5] text-black px-4 py-3 border-2 border-black outline-none font-ui text-[14px] focus:translate-y-[2px] focus:translate-x-[2px] transition-all"
                  />
                  <textarea
                    required
                    name="description"
                    placeholder="Assignment Description"
                    rows={4}
                    className="w-full bg-[#f4f4f5] text-black px-4 py-3 border-2 border-black outline-none font-ui text-[14px] focus:translate-y-[2px] focus:translate-x-[2px] transition-all resize-none"
                  ></textarea>
                  <div>
                    <label className="block text-[12px] font-bold uppercase tracking-widest mb-1">
                      Assignment PDF (Optional)
                    </label>
                    <input
                      name="attachmentFile"
                      type="file"
                      accept="application/pdf"
                      className="block w-full text-[14px] text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-2 file:border-gray-200 file:text-[14px] file:font-semibold file:uppercase file:tracking-widest file:bg-black file:text-white hover:file:bg-gray-800 cursor-pointer bg-white border-2 border-black p-1"
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isUploading}
                    className="bg-[#1ED760] hover:bg-[#18B24E] text-black border-2 border-black rounded-none uppercase tracking-widest font-bold disabled:opacity-50"
                  >
                    {isUploading ? "Uploading..." : "Create Assignment"}
                  </Button>
                </form>
              </div>
            </section>
          )}
          {currentTab === "students" && (
            <section className="space-y-6">
              <h2 className="font-ui font-bold text-[24px] text-black leading-[1.2] uppercase tracking-widest gsap-stagger-item">
                My Students
              </h2>
              <div className="bg-white p-8 border-2 border-black gsap-stagger-item">
                <p className="font-ui text-[14px] text-gray-500 font-semibold uppercase tracking-widest">
                  List of students enrolled in your courses will appear here.
                </p>
              </div>
            </section>
          )}
          {currentTab === "settings" && (
            <section className="space-y-6">
              <h2 className="font-ui font-bold text-[24px] text-black leading-[1.2] uppercase tracking-widest gsap-stagger-item">
                Payout Settings
              </h2>
              <div className="bg-white p-8 border-2 border-black w-full gsap-stagger-item">
                <form
                  onSubmit={handleUpdateSettings}
                  className="flex flex-col gap-6"
                >
                  <div>
                    <label className="block font-ui text-[14px] text-black font-semibold uppercase tracking-widest mb-2">
                      UPI ID (For Course Payouts)
                    </label>
                    <input
                      name="upi_id"
                      type="text"
                      placeholder="yourname@upi"
                      className="w-full bg-[#f4f4f5] text-black px-4 py-3 border-2 border-black outline-none font-ui text-[14px] focus:translate-y-[2px] focus:translate-x-[2px] transition-all"
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="primary"
                    className="bg-[#1ED760] hover:bg-[#18B24E] text-black border-2 border-black rounded-none uppercase tracking-widest font-bold"
                  >
                    Save Payout Details
                  </Button>
                </form>
              </div>
            </section>
          )}
          {currentTab === "ai_tutor" && (
            <section className="space-y-6">
              <h2 className="font-ui font-bold text-[24px] text-black leading-[1.2] uppercase tracking-widest gsap-stagger-item">
                AI Tutor (Course Help)
              </h2>
              <div className="bg-white p-8 border-2 border-black w-full gsap-stagger-item">
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setIsTeacherAskingAi(true);
                    setTeacherAiResponse(null);
                    const formData = new FormData(e.currentTarget);
                    try {
                      const res = await coreApi.post("/ai/doubt", {
                        tenant_id: profile?.tenant_id || 1,
                        student_id: profile?.user_id || profile?.id || 1,
                        question_text: formData.get("question"),
                        reference_type: "context: Teacher Course Building Help",
                      });
                      setTeacherAiResponse(res.data.AiResponse || res.data.ai_response || res.data.answer || res.data.response || res.data.text || JSON.stringify(res.data));
                      (e.target as HTMLFormElement).reset();
                    } catch (err: any) {
                      toast.error("Failed to ask AI");
                    } finally {
                      setIsTeacherAskingAi(false);
                    }
                  }}
                  className="flex flex-col gap-4"
                >
                  <textarea
                    required
                    name="question"
                    placeholder="Ask for help generating a quiz, designing a module, or understanding student progress..."
                    rows={4}
                    className="w-full bg-[#f4f4f5] text-black px-4 py-3 border-2 border-black outline-none font-ui text-[14px] focus:translate-y-[2px] focus:translate-x-[2px] transition-all resize-none"
                  ></textarea>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isTeacherAskingAi}
                    className="bg-[#1ED760] hover:bg-[#18B24E] text-black border-2 border-black rounded-none uppercase tracking-widest font-bold disabled:opacity-50"
                  >
                    {isTeacherAskingAi ? "Asking..." : "Ask AI Tutor"}
                  </Button>
                </form>
                {teacherAiResponse && (
                  <div className="mt-6 p-4 border-2 border-black bg-[#f4f4f5]">
                    <h3 className="font-ui font-bold text-[16px] text-black uppercase tracking-widest mb-2">AI Response:</h3>
                    <p className="whitespace-pre-wrap font-ui text-[14px] text-gray-700">{teacherAiResponse}</p>
                  </div>
                )}
              </div>
            </section>
          )}
        </div>
      )}
      {roleName === "Student" && (
        <div className="space-y-6">
          {currentTab === "learning" && (
            <section className="space-y-6">
              <h2 className="font-ui font-bold text-[24px] text-black leading-[1.2] uppercase tracking-widest gsap-stagger-item">
                My Learning
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-8 border-2 border-black gsap-stagger-item transition-transform hover:-translate-y-1">
                  <h3 className="font-ui font-bold text-[16px] text-black mb-2 uppercase tracking-widest">
                    Advanced React Patterns
                  </h3>
                  <p className="font-ui text-[14px] text-gray-500 mb-6 font-semibold uppercase tracking-widest">
                    You are 60% through the course.
                  </p>
                  <Button
                    variant="primary"
                    className="bg-[#1ED760] hover:bg-[#18B24E] text-black w-full border-2 border-black rounded-none uppercase tracking-widest font-bold"
                    onClick={() =>
                      toast("Opening Video Player...", { icon: "▶️" })
                    }
                  >
                    Resume Video
                  </Button>
                </div>
              </div>
            </section>
          )}
          {currentTab === "assignments" && (
            <section className="space-y-6">
              <h2 className="font-ui font-bold text-[24px] text-black leading-[1.2] uppercase tracking-widest gsap-stagger-item">
                Assignments
              </h2>
              <div className="space-y-4">
                {}
                <div className="bg-white p-8 border-2 border-black w-full gsap-stagger-item transition-transform hover:-translate-y-1">
                  <h3 className="font-ui font-bold text-[16px] text-black mb-2 uppercase tracking-widest">
                    Advanced React Patterns - Final Project
                  </h3>
                  <p className="font-ui text-[14px] text-gray-500 mb-6 font-semibold uppercase tracking-widest">
                    Posted by: Teacher • Due: Tomorrow
                  </p>
                  <Button
                    variant="secondary"
                    className="bg-black hover:bg-gray-800 text-white border-2 border-black rounded-none uppercase tracking-widest font-bold w-auto px-6"
                  >
                    View Assignment Details
                  </Button>
                </div>
              </div>
            </section>
          )}
          {currentTab === "quizzes" && (
            <section className="space-y-6">
              <h2 className="font-ui font-bold text-[24px] text-black leading-[1.2] uppercase tracking-widest gsap-stagger-item">
                Quizzes & Tests
              </h2>
              <div className="bg-white p-8 border-2 border-black gsap-stagger-item">
                <p className="font-ui text-[14px] text-gray-500 font-semibold uppercase tracking-widest">
                  No pending quizzes at the moment.
                </p>
              </div>
            </section>
          )}
          {currentTab === "ai_tutor" && (
            <section className="space-y-6">
              <h2 className="font-ui font-bold text-[24px] text-black leading-[1.2] uppercase tracking-widest gsap-stagger-item">
                AI Tutor (Doubt Solving)
              </h2>
              <div className="bg-white p-8 border-2 border-black w-full gsap-stagger-item">
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setIsStudentAskingAi(true);
                    setStudentAiResponse(null);
                    const formData = new FormData(e.currentTarget);
                    try {
                      const res = await coreApi.post("/ai/doubt", {
                        tenant_id: profile?.tenant_id || 1,
                        student_id: profile?.user_id || profile?.id || 1,
                        question_text: formData.get("question"),
                        reference_type: "context: General Course Context",
                      });
                      setStudentAiResponse(res.data.AiResponse || res.data.ai_response || res.data.answer || res.data.response || res.data.text || JSON.stringify(res.data));
                      (e.target as HTMLFormElement).reset();
                    } catch (err: any) {
                      toast.error("Failed to ask AI");
                    } finally {
                      setIsStudentAskingAi(false);
                    }
                  }}
                  className="flex flex-col gap-4"
                >
                  <textarea
                    required
                    name="question"
                    placeholder="E.g. What is the difference between a class and an interface?"
                    rows={4}
                    className="w-full bg-[#f4f4f5] text-black px-4 py-3 border-2 border-black outline-none font-ui text-[14px] focus:translate-y-[2px] focus:translate-x-[2px] transition-all resize-none"
                  ></textarea>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isStudentAskingAi}
                    className="bg-[#1ED760] hover:bg-[#18B24E] text-black border-2 border-black rounded-none uppercase tracking-widest font-bold disabled:opacity-50"
                  >
                    {isStudentAskingAi ? "Asking..." : "Ask AI Tutor"}
                  </Button>
                </form>
                {studentAiResponse && (
                  <div className="mt-6 p-4 border-2 border-black bg-[#f4f4f5]">
                    <h3 className="font-ui font-bold text-[16px] text-black uppercase tracking-widest mb-2">AI Response:</h3>
                    <p className="whitespace-pre-wrap font-ui text-[14px] text-gray-700">{studentAiResponse}</p>
                  </div>
                )}
              </div>
            </section>
          )}
        </div>
      )}
      {roleName === "SuperAdmin" && (
        <div className="space-y-6">
          {currentTab === "global_analytics" && (
            <GlobalAnalyticsView analytics={globalAnalytics} />
          )}
          {currentTab === "all_users" && (
            <AllUsersView
              users={globalUsers}
              handleDeleteUser={handleDeleteUser}
            />
          )}
        </div>
      )}
      {}
      {courseToDelete !== null && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border-2 border-black w-full max-w-md p-8 relative">
            <button
              onClick={() => setCourseToDelete(null)}
              className="absolute top-4 right-4 text-black hover:text-gray-500 font-bold"
            >
              ✕
            </button>
            <h2 className="font-ui font-bold text-[24px] text-black leading-[1.2] uppercase tracking-widest mb-6">
              Delete Course?
            </h2>
            <p className="font-ui text-[14px] text-gray-700 mb-8 font-semibold uppercase tracking-widest">
              Are you sure you want to delete this course? All associated videos and assignments will be permanently removed from storage.
            </p>
            <div className="flex gap-4">
              <Button
                variant="secondary"
                onClick={() => setCourseToDelete(null)}
                className="bg-gray-200 hover:bg-gray-300 text-black border-2 border-black rounded-none uppercase tracking-widest font-bold w-1/2"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={confirmDeleteCourse}
                className="bg-[#FF3333] hover:bg-[#CC0000] text-white border-2 border-black rounded-none uppercase tracking-widest font-bold w-1/2"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
      {}
      {isCourseModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border-2 border-black w-full max-w-md p-8 relative">
            <button
              onClick={() => setIsCourseModalOpen(false)}
              className="absolute top-4 right-4 text-black hover:text-gray-500 font-bold"
            >
              ✕
            </button>
            <h2 className="font-ui font-bold text-[24px] text-black leading-[1.2] uppercase tracking-widest mb-6">
              Create New Course
            </h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setIsUploading(true);
                const formData = new FormData(e.currentTarget);
                const title = formData.get("title") as string;
                const price = parseFloat(formData.get("price") as string) || 0;
                const courseImage = formData.get("courseImage") as File;
                if (!title) {
                  setIsUploading(false);
                  return;
                }
                try {
                  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                  const createRes = await coreApi.post(`/courses?_t=${Date.now()}`, {
                    tenant_id: profile?.tenant_id || 1,
                    title: title,
                    slug: slug,
                    price: price,
                    created_by: profile?.id || 1,
                  });
                  if (courseImage && courseImage.size > 0) {
                    const imageFormData = new FormData();
                    imageFormData.append("file", courseImage);
                    imageFormData.append("slug", profile?.tenant?.slug || "academy");
                    imageFormData.append("category", `thumbnails/${createRes.data.id}`);
                    const imageRes = await coreApi.post("/upload", imageFormData, {
                      headers: { "Content-Type": "multipart/form-data" },
                    });
                    await coreApi.put(`/courses/${createRes.data.id}`, {
                      thumbnail_url: imageRes.data.url,
                    });
                  }
                  toast.success("Course created successfully!");
                  setIsCourseModalOpen(false);
                  const res = await coreApi.get(
                    `/tenants/${profile?.tenant_id || 1}/courses`,
                  );
                  setCourses(res.data);
                } catch (err: any) {
                  toast.error(
                    err.response?.data?.error || "Failed to create course",
                  );
                } finally {
                  setIsUploading(false);
                }
              }}
              className="space-y-4"
            >
              <div>
                <label className="block font-ui text-[14px] font-bold uppercase tracking-widest mb-2">
                  Course Title
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  placeholder="e.g. Advanced Mathematics"
                  className="w-full bg-[#f4f4f5] text-black px-4 py-3 border-2 border-black outline-none font-ui text-[14px] focus:translate-y-[2px] focus:translate-x-[2px] transition-all"
                />
              </div>
              <div>
                <label className="block font-ui text-[14px] font-bold uppercase tracking-widest mb-2 mt-4">
                  Price (₹)
                </label>
                <input
                  type="number"
                  name="price"
                  min="0"
                  step="0.01"
                  placeholder="e.g. 999.00 (Leave 0 for Free)"
                  className="w-full bg-[#f4f4f5] text-black px-4 py-3 border-2 border-black outline-none font-ui text-[14px] focus:translate-y-[2px] focus:translate-x-[2px] transition-all"
                />
              </div>
              <div>
                <label className="block font-ui text-[14px] font-bold uppercase tracking-widest mb-2 mt-4">
                  Course Thumbnail (Optional)
                </label>
                <input
                  type="file"
                  name="courseImage"
                  accept="image/jpeg,image/png"
                  className="block w-full text-[14px] text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-2 file:border-gray-200 file:text-[14px] file:font-semibold file:uppercase file:tracking-widest file:bg-black file:text-white hover:file:bg-gray-800 cursor-pointer bg-[#f4f4f5] border-2 border-black p-1 focus:translate-y-[2px] focus:translate-x-[2px] transition-all"
                />
              </div>
              <Button
                type="submit"
                disabled={isUploading}
                className="w-full bg-[#1ED760] hover:bg-[#18B24E] text-black border-2 border-black rounded-none uppercase tracking-widest font-bold mt-4 disabled:opacity-50"
              >
                {isUploading ? "Creating..." : "Create Course"}
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="font-ui p-8 text-gray-500 font-semibold uppercase tracking-widest">
          Loading dashboard...
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}

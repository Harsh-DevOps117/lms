"use client";
import { coreApi } from "@/api/client";
import VideoPlayer from "@/components/VideoPlayer";
import { useAuthStore } from "@/store/authStore";
import {
  ChevronLeft,
  FileText,
  Lock,
  PlayCircle,
  UploadCloud,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function CoursePlayerPage() {
  const { slug, courseId } = useParams();
  const router = useRouter();
  const { userId, token } = useAuthStore();
  const [tenant, setTenant] = useState<any>(null);
  const [courseMeta, setCourseMeta] = useState<any>(null);
  const [courseContent, setCourseContent] = useState<{
    videos: any[];
    assignments: any[];
    notes: any[];
  }>({ videos: [], assignments: [], notes: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeVideo, setActiveVideo] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "notes" | "assignments">("overview");
  useEffect(() => {
    if (!token || !userId) {
      router.push(`/${slug}/login`);
      return;
    }
    const fetchData = async () => {
      try {
        const tenantRes = await coreApi.get(`/tenants/slug/${slug}`);
        setTenant(tenantRes.data.tenant);
        const foundCourse = tenantRes.data.courses?.find((c: any) => c.id === parseInt(courseId as string));
        setCourseMeta(foundCourse);
        const contentRes = await coreApi.get(
          `/courses/${courseId}/consume?student_id=${userId}`,
        );
        const content = contentRes.data;
        setCourseContent(content);
        if (content.videos && content.videos.length > 0) {
          setActiveVideo(content.videos[0]);
        }
      } catch (err: any) {
        if (err.response?.status === 403) {
          setError("not_enrolled");
        } else {
          setError("Failed to load course content.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug, courseId, userId, token, router]);
  const handlePurchase = async () => {
    try {
      if (!(window as any).Razorpay) {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      const orderRes = await coreApi.post(`/payments/checkout`, {
        course_id: parseInt(courseId as string)
      });
      const order = orderRes.data;
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_T5vc5suGDToaAq", 
        amount: order.amount,
        currency: "INR",
        name: tenant?.academy_name || "Academy",
        description: `Purchase Course: ${courseMeta?.title}`,
        order_id: order.id,
        handler: async function (response: any) {
          try {
            await coreApi.post(`/payments/verify`, {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              student_id: userId,
              course_id: parseInt(courseId as string)
            });
            window.location.reload();
          } catch (err) {
            alert("Payment verification failed");
          }
        },
        prefill: {
          name: "Student",
          email: "student@example.com",
        },
        theme: {
          color: "#111111",
        },
      };
      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Failed to initiate purchase. Check backend logs.");
    }
  };
  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-ada-bg)] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#111] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  if (error === "not_enrolled") {
    return (
      <div className="min-h-screen bg-[var(--color-ada-bg)] font-ui text-[#111] py-12 px-6 md:px-12">
        <div className="max-w-[1000px] mx-auto bg-white rounded-[20px] border-2 border-[#111] shadow-[8px_8px_0px_#111] overflow-hidden">
          {}
          <div className="p-8 md:p-12 border-b-2 border-[#111] bg-white flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
              <div className="inline-block bg-[var(--color-ada-secondary)] border-2 border-[#111] px-4 py-1 rounded-full text-[13px] font-bold mb-6 shadow-[2px_2px_0px_#111]">
                Course Enrollment
              </div>
              <h1 className="ada-heading text-[40px] md:text-[56px] leading-tight mb-4">
                {courseMeta?.title || "Premium Course"}
              </h1>
              <p className="ada-body text-[18px] opacity-80 max-w-xl">
                {courseMeta?.description || "Join this course to get full access to all lectures, notes, and assignments."}
              </p>
            </div>
          </div>
          {}
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-2/3 p-8 md:p-12 border-b-2 md:border-b-0 md:border-r-2 border-[#111]">
              <h3 className="ada-heading text-[24px] mb-6">What's included</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-[var(--color-ada-primary)] shrink-0 mt-0.5" />
                  <span className="ada-body">Full lifetime access to all video lectures</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-[var(--color-ada-primary)] shrink-0 mt-0.5" />
                  <span className="ada-body">Downloadable notes and resources</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-[var(--color-ada-primary)] shrink-0 mt-0.5" />
                  <span className="ada-body">Hands-on assignments and projects</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-[var(--color-ada-primary)] shrink-0 mt-0.5" />
                  <span className="ada-body">Direct AI Doubt Resolution</span>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/3 p-8 md:p-12 bg-[var(--color-ada-green)] text-white flex flex-col justify-center items-center text-center">
              <span className="text-[16px] mb-2 opacity-90">One-time payment</span>
              <div className="ada-heading text-[48px] mb-8">
                ₹{courseMeta?.price || "0"}
              </div>
              <button 
                onClick={handlePurchase}
                className="w-full bg-[var(--color-ada-primary)] text-[#111] font-medium py-4 px-6 rounded-full border-2 border-[#111] shadow-[4px_4px_0px_#111] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#111] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                Enroll Now <ArrowRight size={18} />
              </button>
              <button onClick={() => router.push(`/${slug}/dashboard`)} className="mt-6 text-[14px] font-medium border-b border-white/50 pb-0.5 hover:opacity-70 transition-opacity">
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (error && error !== "not_enrolled") {
    return (
      <div className="min-h-screen bg-[var(--color-ada-bg)] flex flex-col items-center justify-center p-6 font-ui">
        <div className="w-16 h-16 bg-red-100 text-red-500 border-2 border-[#111] flex items-center justify-center rounded-full mb-4 shadow-[4px_4px_0px_#111]">
          <Lock size={32} />
        </div>
        <h1 className="text-2xl font-bold text-[#111] mb-2">{error}</h1>
        <button
          onClick={() => router.push(`/${slug}/dashboard`)}
          className="mt-6 px-8 py-3 bg-[var(--color-ada-primary)] text-[#111] border-2 border-[#111] shadow-[4px_4px_0px_#111] rounded-full text-sm font-bold hover:brightness-95 active:scale-95 transition-all"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-[#fafafa] font-ui text-[#111111] flex flex-col">
      {}
      <nav className="bg-white border-b-2 border-[#111] h-16 flex items-center px-4 shrink-0 shadow-sm">
        <button
          onClick={() => router.push(`/${slug}/dashboard`)}
          className="flex items-center gap-2 text-sm font-bold text-[#111] hover:opacity-70 mr-6"
        >
          <ChevronLeft size={16} /> Back
        </button>
        <div className="h-6 w-0.5 bg-[#111] mr-6"></div>
        <div className="ada-heading text-[20px] font-bold truncate">Course Player</div>
      </nav>
      <div className="flex flex-1 overflow-hidden">
        {}
        <div className="flex-1 flex flex-col overflow-y-auto">
          {}
          <div className="w-full bg-black flex justify-center border-b-2 border-[#111]">
            {activeVideo ? (
              <div className="w-full max-w-[1200px] aspect-video relative">
                <VideoPlayer
                  key={activeVideo.id}
                  options={{
                    autoplay: true,
                    controls: true,
                    responsive: true,
                    fluid: true,
                    playbackRates: [0.5, 1, 1.25, 1.5, 2],
                    sources: [
                      {
                        src: activeVideo.video_url,
                        type: activeVideo.video_url?.endsWith(".m3u8")
                          ? "application/x-mpegURL"
                          : "video/mp4",
                      },
                    ],
                  }}
                />
              </div>
            ) : (
              <div className="text-gray-500 font-medium">
                No video selected or available
              </div>
            )}
          </div>
          {}
          <div className="max-w-[1000px] w-full mx-auto p-6 md:p-10">
            <h1 className="ada-heading text-[32px] md:text-[40px] mb-6 leading-tight">
              {activeVideo?.title || "Course Overview"}
            </h1>
            {}
            <div className="flex gap-8 border-b-2 border-[#111]/10 mb-8">
              <button
                onClick={() => setActiveTab("overview")}
                className={`pb-4 text-[15px] font-bold transition-colors relative ${activeTab === "overview" ? "text-[#111]" : "text-[#111]/50 hover:text-[#111]/80"}`}
              >
                Overview
                {activeTab === "overview" && (
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-[#111] rounded-t-full"></div>
                )}
              </button>
              <button
                onClick={() => setActiveTab("notes")}
                className={`pb-4 text-[15px] font-bold transition-colors relative ${activeTab === "notes" ? "text-[#111]" : "text-[#111]/50 hover:text-[#111]/80"}`}
              >
                Notes
                {activeTab === "notes" && (
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-[#111] rounded-t-full"></div>
                )}
              </button>
              <button
                onClick={() => setActiveTab("assignments")}
                className={`pb-4 text-[15px] font-bold transition-colors relative ${activeTab === "assignments" ? "text-[#111]" : "text-[#111]/50 hover:text-[#111]/80"}`}
              >
                Assignments
                {activeTab === "assignments" && (
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-[#111] rounded-t-full"></div>
                )}
              </button>
            </div>
            {}
            <div className="min-h-[300px]">
              {activeTab === "overview" && (
                <div className="prose prose-sm max-w-none text-[#111]/80 ada-body text-[16px]">
                  <p>
                    {activeVideo?.description ||
                      "No description available for this video."}
                  </p>
                </div>
              )}
              {activeTab === "notes" && (
                <div className="flex flex-col gap-4">
                  {activeVideo?.note_url && (
                    <div className="flex items-center justify-between p-4 bg-white border-2 border-[#111] shadow-[4px_4px_0px_#111] rounded-[16px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#111] transition-all mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#fceea7] border-2 border-[#111] text-[#111] rounded-full flex items-center justify-center shadow-[2px_2px_0px_#111]">
                          <FileText size={20} />
                        </div>
                        <span className="font-bold text-[16px] text-[#111]">
                          Lecture Notes: {activeVideo.title}
                        </span>
                      </div>
                      <a
                        href={activeVideo.note_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2.5 bg-[#111] shadow-[2px_2px_0px_var(--color-ada-primary)] border-2 border-[var(--color-ada-primary)] text-white text-sm font-bold rounded-full transition-all hover:brightness-95 active:scale-95"
                      >
                        Download
                      </a>
                    </div>
                  )}
                  {courseContent.notes.length === 0 && !activeVideo?.note_url ? (
                    <p className="text-[#111]/60 text-[15px]">
                      No notes uploaded for this course yet.
                    </p>
                  ) : (
                    courseContent.notes.map((note) => (
                      <div
                        key={note.id}
                        className="flex items-center justify-between p-4 bg-white border-2 border-[#111] shadow-[4px_4px_0px_#111] rounded-[16px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#111] transition-all"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-[var(--color-ada-secondary)] border-2 border-[#111] text-[#111] rounded-full flex items-center justify-center shadow-[2px_2px_0px_#111]">
                            <FileText size={20} />
                          </div>
                          <span className="font-bold text-[16px] text-[#111]">
                            {note.title}
                          </span>
                        </div>
                        <a
                          href={note.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-2.5 bg-[var(--color-ada-primary)] border-2 border-[#111] shadow-[2px_2px_0px_#111] text-[#111] text-sm font-bold rounded-full transition-all hover:brightness-95 active:scale-95"
                        >
                          Download
                        </a>
                      </div>
                    ))
                  )}
                </div>
              )}
              {activeTab === "assignments" && (
                <div className="flex flex-col gap-4">
                  {courseContent.assignments.length === 0 ? (
                    <p className="text-[#111]/60 text-[15px]">
                      No assignments posted for this course yet.
                    </p>
                  ) : (
                    courseContent.assignments.map((assignment) => (
                      <div
                        key={assignment.id}
                        className="p-6 bg-white border-2 border-[#111] shadow-[6px_6px_0px_#111] rounded-[20px]"
                      >
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-12 h-12 bg-[#fceea7] border-2 border-[#111] text-[#111] rounded-full flex items-center justify-center shadow-[2px_2px_0px_#111]">
                            <UploadCloud size={20} />
                          </div>
                          <div>
                            <h3 className="font-bold text-[18px] text-[#111]">
                              {assignment.title}
                            </h3>
                            <p className="text-[13px] font-bold text-[#111]/60 uppercase tracking-wider">
                              Max Marks: {assignment.max_marks}
                            </p>
                          </div>
                        </div>
                        <p className="text-[15px] text-[#111]/80 mb-8 ada-body leading-relaxed">
                          {assignment.description}
                        </p>
                        <div className="flex gap-4">
                          {assignment.attachment_url && (
                            <a
                              href={assignment.attachment_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-6 py-3 bg-[var(--color-ada-secondary)] border-2 border-[#111] shadow-[4px_4px_0px_#111] hover:translate-y-1 hover:shadow-[2px_2px_0px_#111] text-[#111] text-[15px] font-bold rounded-full transition-all"
                            >
                              Download Brief
                            </a>
                          )}
                          <button className="px-6 py-3 bg-[#111] border-2 border-[#111] shadow-[4px_4px_0px_#111] hover:translate-y-1 hover:shadow-[2px_2px_0px_#111] text-white text-[15px] font-bold rounded-full transition-all">
                            Submit Work
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        {}
        <div className="w-[380px] bg-white border-l-2 border-[#111] flex flex-col shrink-0 z-10">
          <div className="p-6 border-b-2 border-[#111] bg-[#fafafa]">
            <h2 className="font-bold text-[22px] text-[#111] tracking-tight mb-1">
              Course Content
            </h2>
            <p className="text-[14px] text-[#111]/60 font-medium">
              {courseContent.videos.length} Lectures
            </p>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-3">
            {courseContent.videos.map((video, index) => (
              <button
                key={video.id}
                onClick={() => setActiveVideo(video)}
                className={`w-full text-left p-4 rounded-[16px] flex gap-4 transition-all duration-200 border-2 ${
                  activeVideo?.id === video.id
                    ? "bg-[#fceea7] border-[#111] shadow-[4px_4px_0px_#111] translate-y-[-2px]"
                    : "border-transparent hover:border-[#111] hover:shadow-[4px_4px_0px_#111] hover:translate-y-[-2px] hover:bg-white"
                }`}
              >
                <div
                  className={`mt-0.5 flex-shrink-0 ${activeVideo?.id === video.id ? "text-[var(--color-ada-primary)]" : "text-[#111]/40"}`}
                >
                  <PlayCircle
                    size={22}
                    className={
                      activeVideo?.id === video.id ? "fill-[var(--color-ada-primary)] text-[#111]" : ""
                    }
                  />
                </div>
                <div>
                  <h4
                    className={`text-[15px] leading-snug mb-2 ${activeVideo?.id === video.id ? "font-bold text-[#111]" : "font-semibold text-[#111]/80"}`}
                  >
                    {index + 1}. {video.title}
                  </h4>
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border-2 ${activeVideo?.id === video.id ? "bg-white border-[#111] text-[#111]" : "bg-[#fafafa] border-transparent text-[#111]/50"}`}
                  >
                    Video Lecture
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

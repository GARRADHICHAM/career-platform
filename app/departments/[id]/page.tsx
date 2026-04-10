"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { departments } from "@/lib/questions";
import { departmentDetails } from "@/lib/departmentData";
import { useAuth } from "@/context/AuthContext";

export default function DepartmentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();

  const dept = departments.find((d) => d.id === id);
  const detail = departmentDetails[id];

  if (!dept || !detail) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="text-center">
            <p className="text-4xl mb-4">🔍</p>
            <p className="text-slate-600">Department not found.</p>
            <Link href="/departments" className="text-indigo-600 underline mt-2 block">
              ← Back to departments
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className={`${dept.bgColor} border-b-2 ${dept.bgColor} pt-28 pb-14 px-4`}>
        <div className="max-w-5xl mx-auto">
          <Link
            href="/departments"
            className={`text-xs font-semibold ${dept.color} hover:underline mb-4 inline-block`}
          >
            ← All departments
          </Link>
          <div className="flex items-start gap-5">
            <div className="text-6xl">{dept.icon}</div>
            <div>
              <h1 className={`text-3xl sm:text-4xl font-extrabold ${dept.color} leading-tight`}>
                {dept.name}
              </h1>
              <p className="text-slate-500 text-base mt-1 italic">{detail.tagline}</p>
              <div className="flex flex-wrap gap-4 mt-4">
                <div className="bg-white rounded-xl px-4 py-2 text-center shadow-sm">
                  <p className="text-lg font-extrabold text-slate-900">{detail.employmentRate}</p>
                  <p className="text-xs text-slate-400">employment rate</p>
                </div>
                <div className="bg-white rounded-xl px-4 py-2 text-center shadow-sm">
                  <p className="text-lg font-extrabold text-slate-900">{detail.avgSalary}</p>
                  <p className="text-xs text-slate-400">avg. starting salary</p>
                </div>
                <div className="bg-white rounded-xl px-4 py-2 text-center shadow-sm">
                  <p className="text-lg font-extrabold text-slate-900">3 years</p>
                  <p className="text-xs text-slate-400">specialization duration</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="bg-slate-50 py-14 px-4">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-8">

          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">

            {/* Description */}
            <div className="bg-white rounded-2xl p-7 shadow-sm border border-slate-100">
              <h2 className="text-lg font-extrabold text-slate-900 mb-3">About this department</h2>
              <p className="text-slate-600 leading-relaxed">{detail.fullDescription}</p>
            </div>

            {/* Key courses */}
            <div className="bg-white rounded-2xl p-7 shadow-sm border border-slate-100">
              <h2 className="text-lg font-extrabold text-slate-900 mb-4">📚 Key Courses</h2>
              <div className="grid sm:grid-cols-2 gap-2">
                {detail.keyCourses.map((course) => (
                  <div key={course} className="flex items-start gap-2 text-sm text-slate-700">
                    <span className={`mt-1 w-1.5 h-1.5 rounded-full shrink-0 ${dept.color.replace("text-", "bg-")}`} />
                    {course}
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-2xl p-7 shadow-sm border border-slate-100">
              <h2 className="text-lg font-extrabold text-slate-900 mb-4">🛠️ Skills Developed</h2>
              <div className="flex flex-wrap gap-2">
                {detail.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`${dept.bgColor} border ${dept.color.replace("text-", "border-")} ${dept.color} text-xs font-semibold px-3 py-1.5 rounded-full`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Careers */}
            <div className="bg-white rounded-2xl p-7 shadow-sm border border-slate-100">
              <h2 className="text-lg font-extrabold text-slate-900 mb-4">💼 Career Paths</h2>
              <div className="space-y-3">
                {detail.careers.map((career, i) => (
                  <div
                    key={career.title}
                    className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 border border-slate-100"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm text-white shrink-0 ${
                      i === 0 ? "bg-amber-500" : i === 1 ? "bg-slate-400" : "bg-orange-400"
                    }`}>
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-800 text-sm">{career.title}</p>
                      <p className="text-slate-400 text-xs">{career.sector}</p>
                    </div>
                    <p className="text-slate-700 text-xs font-semibold text-right shrink-0">
                      {career.salary}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">

            {/* Companies */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h3 className="font-extrabold text-slate-900 text-sm mb-4">🏢 Hiring Companies</h3>
              <ul className="space-y-2">
                {detail.companies.map((company) => (
                  <li key={company} className="flex items-center gap-2 text-sm text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                    {company}
                  </li>
                ))}
              </ul>
            </div>

            {/* Test CTA */}
            <div className="bg-slate-900 rounded-2xl p-6 text-center">
              <div className="text-3xl mb-3">{dept.icon}</div>
              <p className="text-white font-bold text-sm mb-2">
                Does this department fit you?
              </p>
              <p className="text-white/50 text-xs mb-4">
                Take the quiz to measure your affinity level with this field.
              </p>
              <Link
                href={user ? `/game/${dept.id}` : "/login"}
                className="block bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold py-3 rounded-xl text-sm transition-all hover:shadow-lg"
              >
                🎯 Test this department
              </Link>
              {!user && (
                <p className="text-white/30 text-xs mt-2">Login required</p>
              )}
            </div>

            {/* Other departments */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h3 className="font-extrabold text-slate-900 text-sm mb-4">Other departments</h3>
              <div className="space-y-2">
                {departments
                  .filter((d) => d.id !== dept.id)
                  .slice(0, 4)
                  .map((d) => (
                    <Link
                      key={d.id}
                      href={`/departments/${d.id}`}
                      className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-slate-50 transition-colors group"
                    >
                      <span className="text-lg">{d.icon}</span>
                      <span className={`text-xs font-semibold ${d.color} group-hover:underline`}>
                        {d.shortName}
                      </span>
                    </Link>
                  ))}
                <Link
                  href="/departments"
                  className="block text-xs text-slate-400 hover:text-slate-600 text-center mt-2 underline"
                >
                  See all →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

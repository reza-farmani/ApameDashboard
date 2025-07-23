// import BlurText from "../ui/animation/BlurText";

import SignupBase from "../ui/LoginForm/SignupBase";

export default function Page() {
  return (
    <main >
      <div className="mb-12 text-4xl"></div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6 h-screen mr-28 ml-28 flex items-center justify-center" dir="rtl">
        {/* <BlurText text="بهترین هارو با ما تجربه کنید" delay={150} animateBy="words" direction="top" className="text-2xl mb-8"/> */}
        <SignupBase />
      </div>
    </main>
  );
}

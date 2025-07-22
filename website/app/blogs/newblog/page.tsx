import AddImage from "@/app/ui/Form/AddImage";
import TextEditor from "../../ui/Form/TextEditor";
import Title from "@/app/ui/Title";

export default function page() {
  return (
    <main >
      <div className="mb-12 text-4xl"></div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6 h-screen mr-28 ml-28 ">
        <Title value="اضافه کردن وبلاگ جدید"/>
        <AddImage/>
        <div className="w-full mr-[-17%] mt-20">
          <TextEditor />
        </div>
      </div>
    </main>
  );
}

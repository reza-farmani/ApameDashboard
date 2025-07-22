'use client';

import { ReactNode, useRef } from 'react';
import { FaBold, FaItalic, FaUnderline } from "react-icons/fa";
import { MdFormatListBulleted, MdFormatListNumbered } from "react-icons/md";
import { TbAlignLeft, TbAlignCenter, TbAlignRight } from "react-icons/tb";
interface ToolbarButtonProps {
  cmd: string;
  icon: ReactNode;
  value?: string;
  title?: string;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({ cmd, icon, value, title }) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    document.execCommand(cmd, false, value ?? undefined);
  };

  return (
    <button
      onClick={handleClick}
      title={title}
      className="px-2 py-1 border rounded mx-1 hover:bg-gray-200 sans-semiBold"
    >
      {icon}
    </button>
  );
};

const TextEditor: React.FC = () => {
  const editorRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 sans-semiBold">
      <div className="mb-2 border-b pb-2 flex flex-wrap gap-2">
        <ToolbarButton cmd="bold" icon={<FaBold />} title="Bold" />
        <ToolbarButton cmd="italic" icon={<FaItalic />} title="Italic" />
        <ToolbarButton cmd="underline" icon={<FaUnderline />} title="Underline" />
        <ToolbarButton cmd="insertUnorderedList" icon={<MdFormatListBulleted />} title="Bullet List" />
        <ToolbarButton cmd="insertOrderedList" icon={<MdFormatListNumbered />} title="Numbered List" />
        <ToolbarButton cmd="justifyLeft" icon={<TbAlignLeft />} title="Align Left" />
        <ToolbarButton cmd="justifyCenter" icon={<TbAlignCenter />} title="Align Center" />
        <ToolbarButton cmd="justifyRight" icon={<TbAlignRight />} title="Align Right" />
      </div>

      <div
        ref={editorRef}
        contentEditable
        className="border min-h-[250px] p-4 rounded shadow focus:outline-none bg-white"
        suppressContentEditableWarning={true}
      >
        متن خود را اینجا بنویسید...
      </div>
    </div>
  );
};

export default TextEditor;

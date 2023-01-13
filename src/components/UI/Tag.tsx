import { XMarkIcon } from "@heroicons/react/24/outline";

type TagProps = {
  text: string;
  index: number;
  onDelete: (i: number) => void;
};

const Tag = ({ text, index, onDelete }: TagProps) => {
  return (
    <li className="flex rounded-md bg-indigo-100 py-1 pl-2 pr-1 text-sm font-light text-indigo-700 shadow-sm">
      <p className="flex items-center gap-x-1">
        {text}{" "}
        <XMarkIcon
          onClick={() => onDelete(index)}
          className="h-5 w-5 rounded-full p-1 text-indigo-700 hover:cursor-pointer hover:bg-indigo-200 hover:text-indigo-800 active:bg-indigo-300"
          aria-hidden="true"
        />
      </p>
    </li>
  );
};

export default Tag;

import { Button } from "@/components/atoms/Button";

const ResetFilterButton = ({
  resetFilter,
  content,
}: {
  resetFilter?: () => void;
  content?: string;
}) => {
  return (
    <Button
      className="px-2 py-1 bg-blue-gradient text-xs font-normal text-white rounded-full"
      onClick={resetFilter}
    >
      {content ? content : "Reset"}
    </Button>
  );
};

export default ResetFilterButton;

import { Button } from "@/components/atoms/Button";
function PaymentButton() {
  return (
    <div className="text-center">
      <Button className="text-sm font-semibold text-[#F4F7FE] bg-aqua-teal-gradient px-4 py-2.5 rounded-lg mr-auto ml-auto shadow-light-shadow">
        Proceed to Payment
      </Button>
    </div>
  );
}

export default PaymentButton;

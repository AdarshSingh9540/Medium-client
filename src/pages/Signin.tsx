import Quote from "../components/Quote";
import Auth from "../components/Auth";

export const Signin = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-full flex justify-center items-center">
        <div className="w-1/2 flex justify-center">
          <Auth type="signin" />
        </div>
        <div className="w-1/2 flex justify-center  invisible lg:visible">
          <Quote />
        </div>
      </div>
    </div>
  );
};

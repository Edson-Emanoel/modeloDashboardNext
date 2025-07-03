import Aside from "../_components/Aside";
import Header from "../_components/Header";
import Content from "../_components/Content";

export default function Dashboard() {
  return (
      <div className="w-screen h-screen flex">
            <Aside />
            
            <div className="w-full h-full gap-15 flex flex-col items-center justify-center">
                  <Header />
                  <Content />
            </div>
      </div>
  );
}
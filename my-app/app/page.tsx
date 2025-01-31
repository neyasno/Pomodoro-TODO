
import Tasks from "./_components/Tasks/Tasks";
import Timer from "./_components/Timer/Timer";


export default function Home() {

  return (
    <div className="w-full flex flex-col justify-center m-auto">
      <div className="w-full flex flex-col gap-4 items-center justify-center">
        <Timer/>
        <Tasks/>
      </div>
    </div>
  );
}

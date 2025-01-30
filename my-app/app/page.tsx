
import Tasks from "./_components/Tasks/Tasks";
import Timer from "./_components/Timer/Timer";


export default function Home() {

  return (
    <div className="flex flex-col justify-center m-auto">
      <div className="w-1/2">
        <Timer/>
      </div>
      <Tasks/>
    </div>
  );
}

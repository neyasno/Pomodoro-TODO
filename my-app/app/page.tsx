
import Tasks from "./_components/Tasks/Tasks";
import TimerC from "./_components/Timer/TimerC";


export default function Home() {

  return (
    <div className="w-full flex flex-col justify-center dark:bg-black m-auto">
      <div className="w-full flex flex-col gap-4 items-center justify-center">
        <TimerC/>
        <Tasks/>
      </div>
    </div>
  );
}

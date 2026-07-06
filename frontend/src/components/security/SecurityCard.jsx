import CountUp from "react-countup";

export default function SecurityCard(props) {

  // console.log("SecurityCard Props:", props);

  return (
    <div className="border border-slate-700 rounded-xl p-5">

      <p>{String(props.title)}</p>

      <h2>
        {JSON.stringify(props.value)}
      </h2>

      <p>{String(props.subtitle)}</p>

      <div>
        {props.icon}
      </div>

    </div>
  );
}
import "../../sass/components/skeltonLoader.scss";

type propSkelton = {
  times: number;
  className: string;
};

export default function SkeltonLoader({ times, className }: propSkelton) {
  const boxes = Array(times)
    .fill(0)
    .map((_, i) => {
      return (
        <div className={`outerDiv ${className}`} key={i}>
          <div className="innerDiv" />
        </div>
      );
    });

  return <div className="skeltonParent">{boxes}</div>;
}

// export default function Skelton({ times }) {
//   const boxes = [];
//   for (let i = 0; i < times; i++) {
//     boxes.push(<div key={i}></div>);
//   }
//   <div></div>;
//   return boxes;
// }

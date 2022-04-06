import { FC } from "react";

interface RatingProps {
  value: number;
  setValue: (value: number) => void;
  readonly?: boolean;
}

const Rating: FC<RatingProps> = ({ value, setValue, readonly }) => {

  const stars: JSX.Element[] = [];

  for (let i = 0; i < 5; i++) {
    stars.push(
      <div
        onClick={() => {
          if (!readonly) {
            setValue(i)
          }
        }}
        className={`flex justify-center items-center select-none text-3xl aspect-square w-12 ${readonly ? "cursor-default" : "cursor-pointer"} ${value >= i ? "opacity-100" : "opacity-30"}`}
        key={`rating-star-${i}`}
      >
        💩
      </div>
    );
  }

  return <div className="rating">
    {stars}
  </div>;
};

export default Rating;
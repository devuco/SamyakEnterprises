interface ShuffleProps {
  array: Array<Object>;
}
const Shuffle = ({array}: ShuffleProps) => {
  return array.sort(() => Math.random() - 0.5);
};

export default Shuffle;

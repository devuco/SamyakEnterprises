interface ShuffleProps {
  array: Array<Object>;
}
export default ({array}: ShuffleProps) => array.sort(() => Math.random() - 0.5);

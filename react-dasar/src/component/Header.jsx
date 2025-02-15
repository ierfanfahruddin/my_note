
export default function Header(props = {}) {
  // eslint-disable-next-line react/prop-types
  return (<h1>Hello World {props.tes || 'Hehe'}</h1>);
}
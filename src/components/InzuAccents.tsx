import linked from '../assets/rain-linked.svg';
type AccentProps = { className?: string };
export const RoomAccent = ({ className }: AccentProps) => <img className={className} src={linked} alt="" aria-hidden="true" />;

import { Link } from 'react-router-dom';
import wordmark from '../assets/inzu-wordmark-dark.svg';

export default function BrandMark() {
  return <Link className="lp-brand" to="/" aria-label="Inzu home"><img src={wordmark} alt="Inzu" /></Link>;
}

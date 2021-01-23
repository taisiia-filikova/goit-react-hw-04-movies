import errorImg from '../../img/nothing-found.png';
import s from './NotFoundImg.module.css';

export default function NotFoundImg() {
  return (
    <main role="alert" className={s.main}>
      <img src={errorImg} width="650" alt="Error" className={s.img} />
      <h1 className={s.title}>404. Page not found.</h1>
    </main>
  );
}

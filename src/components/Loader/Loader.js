import s from './Loader.module.css';

import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

function Load() {
  return (
    <div className={s.overlay}>
      <Loader
        type="TailSpin"
        color="#c392c3"
        height={60}
        width={60}
        timeout={0}
      />
    </div>
  );
}

export default Load;

import s from './Loader.module.css';

import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

function Load() {
  return (
    <div className={s.overlay}>
      <Loader
        type="TailSpin"
        color="#3f51b5"
        height={80}
        width={80}
        timeout={0}
      />
    </div>
  );
}

export default Load;

import PropTypes from 'prop-types';
import errorImage from '../../img/nothing-found.png';
import s from './ErrorImg.module.css';

function ErrorImg({ message }) {
  return (
    <div role="alert" className={s.wrapper}>
      <img src={errorImage} width="500" alt="sad-folder" className={s.img} />
      <p text={message} className={s.text}>
        {message}
      </p>
    </div>
  );
}

ErrorImg.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorImg;

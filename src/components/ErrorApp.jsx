import '../App.css'

const ErrorApp = ({mensaje}) => {
  return (
    <div className="error-container">
      <p className='error-text'>Algo está fallando, pruebe más tarde</p>
    </div>
  );
};

export default ErrorApp;
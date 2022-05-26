import './Help.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro'; // <-- import styles to be used


const Help = () => {
  
  return (
    <div className='Help'>
      <h3>Comandos para el stream!</h3>

      <section>
        <div className='square_box box_three'></div>
        <div className='square_box box_four'></div>
        <div className='container mt-5'>
          <div className='row'>
            <div>
              <FontAwesomeIcon icon={solid('user-secret')} />
              <FontAwesomeIcon icon={regular('coffee')} />

      With Coffee Checked, these companies always know their coffee is hot and ready!
            </div>
            <div className="alert fade alert-simple alert-success alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show">
              <i className="fas fa-lightbulb-on"></i>
              <i className="start-icon far fa-check-circle faa-tada animated"></i>
              <strong className="font__weight-semibold">Well done!</strong> You successfullyread this important.
            </div>

          </div>
        </div>
      </section>
      
    </div>
    
  );
};

export default Help;
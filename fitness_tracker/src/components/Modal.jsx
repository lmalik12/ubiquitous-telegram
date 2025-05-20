import ReactDom from 'react-dom';

export default function Modal(props) {
  const { showExerciseDesc, handleCloseModal } = props;
  const { name, description } = showExerciseDesc || {};

  return ReactDom.createPortal((
      <div className='modal-container'>
        <button className='modal-underlay' onClick={handleCloseModal} />
        <div className='modal-content'>
          <div>
            <div className='modal-header'>
            <h6>Name</h6>
            <button className='modal-close-button' onClick={handleCloseModal}>x</button>
            </div>
            <h2 className='skill-name'>{name.replaceAll('-', ' ')}</h2>
          </div>
          <div>
            <h6>Description</h6>
            <p>{description}</p>
          </div>
        </div>
      </div>
    ),
     document.getElementById('portal')
    )
}
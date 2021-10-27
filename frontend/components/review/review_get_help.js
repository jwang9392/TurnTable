import React from "react";
import { closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';

const ReviewGetHelp = ({ closeModal }) => {
  return (
    <>
      <div onClick={closeModal}/>
      <h2>Review guidelines</h2>
      <p>Your review should help other diners decide if this restaurant is a good choice for them.</p>
      <ul>
        <li>Keep it short, simple and specific</li>
        <li>Make it useful – describe the scene, food and service levels</li>
        <li>Describe outstanding dishes, beverages or service experiences</li>
        <li>Capture what makes the restaurant unique</li>
        <li>Avoid storytelling or irrelevant details</li>
      </ul>
      <h4>Sample review:</h4>
      <p>"I love the relaxed feel of this place – like a comfortable dining room in a friends home. I definitely would return to try more dishes. The potato-leek soup was amazing and the Bibb lettuce salad was refreshing. The table was split on the monkfish – one person thought it was great, but another felt that the tastes didn't quite mesh. Everyone loved the flat iron steak. Service was well-timed and friendly, wines were affordable."</p>
    </>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal())
  };
};


export default connect(null, mapDispatchToProps)(ReviewGetHelp);
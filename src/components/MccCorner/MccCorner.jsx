import React from "react";
import { Link } from 'react-router-dom';

import mccImg1 from '../../assets/mcc-corner/1.png';
import mccImg2 from '../../assets/mcc-corner/2.png';
import mccImg3 from '../../assets/mcc-corner/3.png';
import mccImg4 from '../../assets/mcc-corner/4.png';
import mccImg5 from '../../assets/mcc-corner/5.png';
import mccImg6 from '../../assets/mcc-corner/6.png';
import mccImg7 from '../../assets/mcc-corner/7.png';
import mccImg8 from '../../assets/mcc-corner/8.png';
import mccImg9 from '../../assets/mcc-corner/9.png';
import mccImg10 from '../../assets/mcc-corner/10.png';

import Paragraph from "../Paragraph/Paragraph";

import '../../styles/mcc-corner.css';

const MccCorner = () => {
    return (
        <div className="mcc-corner">
            <div className="arrow-down-mcc-corner"></div>
            <div id="container">
                <div className="col-left">
                    <div className="mcc-corner-heading">
                        <Paragraph text="ZCMC is here to serve you" className="subheading" />
                        <Paragraph text="A medical facility you can trust" className="heading" />
                        <Paragraph text="For 106 years and counting, the Zamboanga City Medical Center has been serving the community with
                            dedication, compassion, professionalism, and commitment to safety, ensuring that the hospital only brings
                            out the best services for patients and clients." className="description" />
                    </div>
                    <Link to="/" id="mcc-secondary-CTA" rel="noopener noreferrer" >
                        Read more about ZCMC
                    </Link>
                </div>

                <div className="col-right">
                    <div className="mcc-seals">
                        <div className="col-1">
                            <img src={mccImg1} alt="" className="mcc-img-1" />
                        </div>

                        <div className="col-2">
                            <div id="col-1">
                                <img src={mccImg2} alt="" className="mcc-img-2" />
                                <img src={mccImg3} alt="" className="mcc-img-3" />
                                <img src={mccImg4} alt="" className="mcc-img-4" />
                            </div>
                            <div id="col-2">
                                <img src={mccImg5} alt="" className="mcc-img-5" />
                                <img src={mccImg6} alt="" className="mcc-img-6" />
                                <img src={mccImg7} alt="" className="mcc-img-7" />
                            </div>
                        </div>
                    </div>
                    <div className="certs-accreditations">
                        <Paragraph text="Our certifications and accreditations" className="label" />
                        <div className="image-group">
                            <img src={mccImg8} alt="" className="mcc-img-8" />
                            <img src={mccImg9} alt="" className="mcc-img-9" />
                            <div className="img-container">
                                <img src={mccImg10} alt="" className="mcc-img-10" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MccCorner;

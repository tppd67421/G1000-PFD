import React from 'react';
import PropTypes from 'prop-types';

import CoursePointer from './CoursePointer'

import GPSCourcePointer from './../horizon/assets/HSI/GPScource_pointer.png'
import GPSCourceDeviation from './../horizon/assets/HSI/GPScource_deviation.png'
import LOCCoursePointer from './../horizon/assets/HSI/LOCcource_pointer.png'
import LOCCourceDeviation from './../horizon/assets/HSI/LOCcource_deviation.png'
import VORCoursePointer from './../horizon/assets/HSI/VORcource_pointer.png'
import VORCourceDeviation from './../horizon/assets/HSI/VORcource_deviation.png'

import toIndicator from './../horizon/assets/HSI/TO_indicator.png'
import toIndicatorGreen from './../horizon/assets/HSI/TO_indicator_green.png'

function CdiElement({ HSISize, heading, hsiObs, hsiObsDef, hsiToFrom, hsiSource, hsi360 }) {
    const arrowImages = {
        courcePointerArrow: null,
        courceDeviation: null,
        toIndicator: null
    }

    switch (hsiSource) {
        // gps
        case 2:
            arrowImages.courcePointerArrow = GPSCourcePointer
            arrowImages.courceDeviation = GPSCourceDeviation
            arrowImages.toIndicator = toIndicator
            break
        // vor1
        case 0:
            arrowImages.courcePointerArrow = LOCCoursePointer
            arrowImages.courceDeviation = LOCCourceDeviation
            arrowImages.toIndicator = toIndicatorGreen
            break
        // vor2
        case 1:
            arrowImages.courcePointerArrow = VORCoursePointer
            arrowImages.courceDeviation = VORCourceDeviation
            arrowImages.toIndicator = toIndicatorGreen
            break
    }

    return (
        <CoursePointer
            courcePointerArrow={arrowImages.courcePointerArrow}
            courceDeviation={arrowImages.courceDeviation}
            toIndicator={arrowImages.toIndicator}
            HSISize={HSISize}
            heading={heading}
            hsiObs={hsiObs}
            hsiObsDef={hsiObsDef}
            hsiToFrom={hsiToFrom}
            hsiSource={hsiSource}
            hsi360={hsi360}
        />
    )
}

CdiElement.propTypes = {
    HSISize: PropTypes.object.isRequired,
    heading: PropTypes.number.isRequired,
    hsiObs: PropTypes.number.isRequired,
    hsiObsDef: PropTypes.number.isRequired,
    hsiToFrom: PropTypes.number.isRequired,
    hsiSource: PropTypes.number.isRequired,
    hsi360: PropTypes.bool.isRequired
}

export default CdiElement

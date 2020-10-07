import React from 'react';
import PropTypes from 'prop-types';
import { Group, Text, Rect } from 'react-konva';
import Image from './../../common/konvaImage';

import HeadingBug from './HeadingBug'
import Radio from './Radio'
import CdiElement from './CdiElement'

import HSI from './../horizon/assets/HSI/HSI.png'
import HSIAircraft from './../horizon/assets/HSI/HSI_aircraft.png'
import HSIBackground from './../horizon/assets/HSI/HSI_background.png'
import trackIndicator from './../horizon/assets/HSI/track_indicator.png'
import turnRateImage from './../horizon/assets/HSI/turn_rate.png'

import bearingPointer1 from './../horizon/assets/HSI/bearing_pointer1.png'
import bearingPointer2 from './../horizon/assets/HSI/bearing_pointer2.png'

const bearingPointer1Available = true
const bearingPointer2Available = true
const bearingPointer1RotationExample = 90
const bearingPointer2RotationExample = 165

function HorizontalSituationIndicator({
    x,
    y,
    heading,
    headingBug,
    turnRate,
    hsiToFrom,
    hsiObs,
    hsiObsDef,
    hsiSource,
    currentTrackIndicator,
    nav1Frequency,
    nav2Frequency,
    nav1Distance,
    nav2Distance,
    nav1Bearing,
    nav2Bearing
}) {
    const hsi360 = true
    // const hsi360 = false

    const HSISize = hsi360
        ? { width: 290, height: 290 }
        : { width: 400, height: 400 }
    const headingWindowSize = { width: 58, height: 30 }
    const trackIndicatorSize = hsi360
        ? { width: 13, height: 20 }
        : { width: 18, height: 25 }
    const trackIndicatorOffset = { x: 7, y: (HSISize.width + 40) / 2 }
    const HSIBackgroundSize = hsi360
        ? { width: HSISize.width + 60, height: HSISize.height + 60 }
        : { width: HSISize.width + 80, height: HSISize.height + 80 }
    const headingValue = heading >= 100
        ? `${Math.floor(heading)}`
        : heading >= 10
            ? `0${Math.floor(heading)}`
            : `00${Math.floor(heading)}`

    return (
        <>
            <Group
                x={hsi360 ? x : x - 55} // new width minus old width = 55
                y={hsi360 ? y : y + 170}
            >
                <Group
                    rotation={-heading}
                    offset={{ x: HSISize.width / 2, y: HSISize.height / 2 }}
                    x={HSISize.width / 2}
                    y={HSISize.height / 2}
                >
                    <Image
                        src={HSI}
                        x={0}
                        y={0}
                        width={HSISize.width}
                        height={HSISize.height}
                    />
                </Group>
                {
                    bearingPointer1Available
                    && <Image
                        offset={{ x: HSISize.width / 2, y: HSISize.height / 2 }}
                        x={HSISize.width / 2}
                        y={HSISize.width / 2}
                        rotation={bearingPointer1RotationExample - heading}
                        src={bearingPointer1}
                        width={HSISize.width}
                        height={HSISize.height}
                    />
                }
                {
                    bearingPointer2Available
                    && <Image
                        offset={{ x: HSISize.width / 2, y: HSISize.height / 2 }}
                        x={HSISize.width / 2}
                        y={HSISize.width / 2}
                        rotation={bearingPointer2RotationExample - heading}
                        src={bearingPointer2}
                        width={HSISize.width}
                        height={HSISize.height}
                    />
                }
                <HeadingBug
                    rotate={-heading + headingBug}
                    headingBugValue={headingBug}
                    HSISize={HSISize}
                    hsi360={hsi360}
                />
                <Image
                    src={HSIBackground}
                    x={-((HSIBackgroundSize.width - HSISize.width) / 2)}
                    y={-((HSIBackgroundSize.height - HSISize.height) / 2)}
                    width={HSIBackgroundSize.width}
                    height={HSIBackgroundSize.height}
                />
                <Image
                    src={trackIndicator}
                    rotation={currentTrackIndicator - heading}
                    offset={{ x: trackIndicatorOffset.x, y: trackIndicatorOffset.y }}
                    x={HSISize.width / 2 - trackIndicatorSize.width / 2 + trackIndicatorOffset.x}
                    y={-20 + trackIndicatorOffset.y}
                    width={trackIndicatorSize.width}
                    height={trackIndicatorSize.height}
                />
                <Group
                    clip={
                        hsi360
                            ? { x: 150, y: -20, width: 60, height: 100 }
                            : { x: 206, y: -20, width: 100, height: 100 }
                    }
                >
                    <Image
                        src={turnRateImage}
                        x={HSISize.width / 2}
                        y={hsi360 ? 146 : 213}
                        width={hsi360 ? 225 : 280}
                        height={55}
                        offset={
                            hsi360
                                ? { x: 225 / 2, y: (HSISize.height + 25) / 2 }
                                : { x: 280 / 2, y: (HSISize.height + 50) / 2 }
                        }
                        // rotation: -45 deg min, -22 deg max (hsi360 true)
                        // rotation: -37 deg min, -15 deg max (hsi360 false)
                        rotation={
                            hsi360
                                ? (turnRate > 0 ? Math.min(-22, -45 + turnRate) : -45)
                                : (turnRate > 0 ? Math.min(-15, -37 + turnRate) : -37)
                        }
                    />
                </Group>
                <Group
                    clip={
                        hsi360
                            ? { x: 80, y: -20, width: 60, height: 100 }
                            : { x: 40, y: -20, width: 154, height: 100 }
                    }
                >
                    <Image
                        src={turnRateImage}
                        x={HSISize.width / 2}
                        y={hsi360 ? 146 : 213}
                        width={hsi360 ? 225 : 280}
                        height={55}
                        offset={
                            hsi360
                                ? { x: 225 / 2, y: (HSISize.height + 25) / 2 }
                                : { x: 280 / 2, y: (HSISize.height + 50) / 2 }
                        }
                        // rotation: 45 deg min, 22 deg max (hsi360 true)
                        // rotation: 37 deg min, 15 deg max (hsi360 false)
                        rotation={
                            hsi360
                                ? (turnRate < 0 ? Math.max(22, 45 + turnRate) : 45)
                                : (turnRate < 0 ? Math.max(15, 37 + turnRate) : 37)
                        }
                    />
                </Group>
                <Group
                    x={HSISize.width / 2 - headingWindowSize.width / 2}
                    y={-50}
                >
                    <Rect
                        width={headingWindowSize.width}
                        height={headingWindowSize.height}
                        fill={'black'}
                    />
                    <Text
                        x={4}
                        y={4}
                        text={`${headingValue}°`}
                        fill={'white'}
                        fontSize={25}
                        fontFamily={'Frutiger'}
                    />
                </Group>
                <CdiElement
                    HSISize={HSISize}
                    heading={heading}
                    hsiObs={hsiObs}
                    hsiObsDef={hsiObsDef}
                    hsiToFrom={hsiToFrom}
                    hsiSource={hsiSource}
                    hsi360={hsi360}
                />
                <Image
                    src={HSIAircraft}
                    x={0}
                    y={0}
                    width={HSISize.width}
                    height={HSISize.height}
                />
                <Radio
                    x={x + 75}
                    y={y + 85}
                    nav1Frequency={nav1Frequency}
                    nav1Distance={nav1Distance}
                    nav2Distance={nav2Distance}
                />
            </Group>
        </>
    )
}

HorizontalSituationIndicator.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    heading: PropTypes.number.isRequired,
    headingBug: PropTypes.number.isRequired,
    turnRate: PropTypes.number.isRequired,
    hsiToFrom: PropTypes.number.isRequired,
    hsiObs: PropTypes.number.isRequired,
    hsiObsDef: PropTypes.number.isRequired,
    hsiSource: PropTypes.number.isRequired,
    currentTrackIndicator: PropTypes.number.isRequired,
    nav1Frequency: PropTypes.number.isRequired,
    nav2Frequency: PropTypes.number.isRequired,
    nav1Distance: PropTypes.number.isRequired,
    nav2Distance: PropTypes.number.isRequired,
    nav1Bearing: PropTypes.number.isRequired,
    nav2Bearing: PropTypes.number.isRequired
}

export default HorizontalSituationIndicator

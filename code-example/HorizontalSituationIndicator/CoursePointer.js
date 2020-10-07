import React from 'react';
import PropTypes from 'prop-types';
import { Group, Rect, Text } from 'react-konva';
import Image from './../../common/konvaImage';

import deviationScale from './../horizon/assets/HSI/deviation_scale.png'

const selectedCourseSize = { width: 82, height: 25 }

function SelectedCourse({ x, y, courseValue, hsiSource }) {
    const courseValueFloor = Math.floor(courseValue)

    return (
        <Group x={x} y={y}>
            <Rect
                width={selectedCourseSize.width}
                height={selectedCourseSize.height}
                fill={'black'}
                opacity={0.8}
            />
            <Text
                x={5}
                y={7}
                text={'CRS'}
                fill={'white'}
                fontSize={13}
                fontFamily={'Frutiger'}
            />
            <Text
                x={45}
                y={5}
                fill={
                    hsiSource === 2 // gps
                        ? 'magenta'
                        : 'lawngreen'
                }
                fontSize={16}
                text={`${courseValueFloor < 10
                    ? `00${courseValueFloor}°`
                    : courseValueFloor < 100
                        ? `0${courseValueFloor}°`
                        : `${courseValueFloor}°`
                    }`
                }
                fontFamily={'Frutiger'}
            />
        </Group>
    )
}

function TextElement({ hsiSource, deltaX }) {
    switch (hsiSource) {
        // gps
        case 2:
            return (
                <Group x={deltaX + 92} y={110}>
                    <Text text={'GPS'} fill={'magenta'} fontSize={15} fontFamily={'Frutiger'} />
                    <Text x={77} text={'ENR'} fill={'magenta'} fontSize={15} fontFamily={'Frutiger'} />
                </Group>
            )

        // vor1
        case 0:
            return (
                <Text
                    x={deltaX + 85}
                    y={110}
                    text={'VOR1'}
                    fill={'lawngreen'}
                    fontSize={15}
                    fontFamily={'Frutiger'}
                />
            )

        // vor2
        case 1:
            return (
                <Text
                    x={deltaX + 85}
                    y={110}
                    text={'VOR2'}
                    fill={'lawngreen'}
                    fontSize={15}
                    fontFamily={'Frutiger'}
                />
            )
    }
}

function CoursePointer({
    courcePointerArrow,
    courceDeviation,
    toIndicator,
    HSISize,
    heading,
    hsiObs,
    hsiObsDef,
    hsiToFrom,
    hsiSource,
    hsi360
}) {
    const courceDeviationCoef = 27.5

    return (
        <>
            <Group
                offset={{ x: HSISize.width / 2, y: HSISize.height / 2 }}
                x={HSISize.width / 2}
                y={HSISize.width / 2}
                rotation={hsiObs - heading}
            >
                <Image
                    src={courcePointerArrow}
                    x={0}
                    y={0}
                    width={HSISize.width}
                    height={HSISize.height}
                />
                <Image
                    src={courceDeviation}
                    x={hsiObsDef * courceDeviationCoef}
                    y={0}
                    width={HSISize.width}
                    height={HSISize.height}
                />
                <Image
                    src={toIndicator}
                    offset={{ x: HSISize.width / 2, y: HSISize.height / 2 }}
                    rotation={hsiToFrom === 1 ? 0 : 180}
                    x={HSISize.width / 2}
                    y={HSISize.width / 2}
                    width={HSISize.width}
                    height={HSISize.height}
                    opacity={hsiToFrom === 0 ? 0 : 1}
                />
                <Image
                    src={deviationScale}
                    x={0}
                    y={0}
                    width={HSISize.width}
                    height={HSISize.height}
                />
            </Group>
            <TextElement
                hsiSource={hsiSource}
                deltaX={hsi360 ? 0 : 55}
            />
            <SelectedCourse
                x={
                    hsi360
                        ? HSISize.width - selectedCourseSize.width / 2
                        : HSISize.width - selectedCourseSize.width
                }
                y={-30}
                courseValue={hsiObs}
                hsiSource={hsiSource}
            />
        </>
    )
}

SelectedCourse.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    courseValue: PropTypes.number.isRequired,
    hsiSource: PropTypes.number.isRequired
}

TextElement.propTypes = {
    hsiSource: PropTypes.number.isRequired,
    deltaX: PropTypes.number.isRequired
}

CoursePointer.propTypes = {
    courcePointerArrow: PropTypes.string.isRequired,
    courceDeviation: PropTypes.string.isRequired,
    toIndicator: PropTypes.string.isRequired,
    HSISize: PropTypes.object.isRequired,
    heading: PropTypes.number.isRequired,
    hsiObs: PropTypes.number.isRequired,
    hsiObsDef: PropTypes.number.isRequired,
    hsiToFrom: PropTypes.number.isRequired,
    hsiSource: PropTypes.number.isRequired,
    hsi360: PropTypes.bool.isRequired
}

export default CoursePointer

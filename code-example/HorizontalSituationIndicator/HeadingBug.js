import React from 'react'
import PropTypes from 'prop-types';
import { Group, Text, Rect } from 'react-konva';
import Image from './../../common/konvaImage';

import headingBugImage from './../horizon/assets/HSI/heading_bug.png'

const headingBugSize = { width: 82, height: 25 }

function HeadingBug({ rotate, headingBugValue, HSISize, hsi360 }) {
    return (
        <>
            <Group
                x={
                    hsi360
                        ? -headingBugSize.width / 2
                        : 0
                }
                y={-30}
            >
                <Rect width={82} height={25} fill={'black'} opacity={0.8} />
                <Text
                    x={5}
                    y={7}
                    text={'HDG'}
                    fill={'white'}
                    fontSize={13}
                    fontFamily={'Frutiger'}
                />
                <Text
                    x={45}
                    y={5}
                    fill={'turquoise'}
                    fontSize={16}
                    text={`${headingBugValue < 10
                        ? `00${headingBugValue}°`
                        : headingBugValue < 100
                            ? `0${headingBugValue}°`
                            : `${headingBugValue}°`
                        }`
                    }
                    fontFamily={'Frutiger'}
                />
            </Group>
            <Image
                offset={{ x: 14, y: HSISize.width / 2 }}
                x={HSISize.width / 2}
                rotation={rotate}
                y={HSISize.height / 2}
                src={headingBugImage}
                width={27}
                height={12}
            />
        </>
    )
}

HeadingBug.propTypes = {
    rotate: PropTypes.number.isRequired,
    headingBugValue: PropTypes.number.isRequired,
    HSISize: PropTypes.object.isRequired,
    hsi360: PropTypes.bool.isRequired
}

export default HeadingBug

import React from 'react';
import PropTypes from 'prop-types';
import { Group, Rect, Text } from 'react-konva';
import Image from './../../common/konvaImage';

import radioBgLeft from './../horizon/assets/HSI/HSI_window_L.png'
import radioBgRight from './../horizon/assets/HSI/HSI_window_R.png'
import arrowLeft from './../horizon/assets/HSI/bearing_pointer1.png'
import arrowRight from './../horizon/assets/HSI/bearing_pointer2.png'

function Radio({ x, y, nav1Frequency, nav1Distance, nav2Distance }) {
    const radioBgSize = { width: 180, height: 65 }

    const stationExample = '1WA6'
    const sourceExample1 = 'NAV1'
    const sourceExample2 = 'NAV2'

    const nav1DistanceClipped = nav1Distance ? Math.round(nav1Distance * 10) / 10 : '--.-'
    const nav2DistanceClipped = nav2Distance ? Math.round(nav2Distance * 10) / 10 : '--.-'

    return (
        <Group x={x} y={y}>
            <Group x={0} y={0}>
                <Rect
                    width={70}
                    height={85}
                    fill={'black'}
                    opacity={0.9}
                />
                <Text
                    y={5}
                    x={5}
                    text={'DME'}
                    fill={'white'}
                    fontFamily={'Frutiger'}
                    fontSize={15}
                />
                <Text
                    y={25}
                    x={5}
                    text={'NAV1'}
                    fill={'turquoise'}
                    fontFamily={'Frutiger'}
                    fontSize={15}
                />
                <Text
                    y={45}
                    x={5}
                    text={nav1Frequency / 100}
                    fill={'turquoise'}
                    fontFamily={'Frutiger'}
                    fontSize={15}
                />
                <Text
                    y={65}
                    x={5}
                    text={`${nav1DistanceClipped ? nav1DistanceClipped : '--.-'} NM`}
                    fill={'white'}
                    fontFamily={'Frutiger'}
                    fontSize={15}
                />
            </Group>
            <Group
                y={90}
                clip={{ x: 0, y: 0, width: radioBgSize.width, height: radioBgSize.height }}
            >
                <Image
                    src={radioBgLeft}
                    width={radioBgSize.width}
                    height={radioBgSize.height}
                />
                <Text
                    y={5}
                    x={5}
                    text={`${nav1DistanceClipped} NM`}
                    fill={'white'}
                    fontFamily={'Frutiger'}
                    fontSize={15}
                />
                <Text
                    y={25}
                    x={5}
                    text={stationExample}
                    fill={'turquoise'}
                    fontFamily={'Frutiger'}
                    fontSize={15}
                />
                <Text
                    y={45}
                    x={5}
                    text={sourceExample1}
                    fill={'white'}
                    fontFamily={'Frutiger'}
                    fontSize={15}
                />
                <Image
                    x={70}
                    y={92}
                    rotation={-90}
                    src={arrowLeft}
                    width={80}
                    height={240}
                />
            </Group>
            <Group
                x={260}
                y={90}
                clip={{ x: 0, y: 0, width: radioBgSize.width, height: radioBgSize.height }}
            >
                <Image
                    src={radioBgRight}
                    width={radioBgSize.width}
                    height={radioBgSize.height}
                />
                <Text
                    y={5}
                    x={-10}
                    text={`${nav2DistanceClipped} NM`}
                    fill={'white'}
                    fontFamily={'Frutiger'}
                    width={radioBgSize.width}
                    fontSize={15}
                    align={'right'}
                />
                <Text
                    y={25}
                    x={-10}
                    text={stationExample}
                    fill={'turquoise'}
                    fontFamily={'Frutiger'}
                    width={radioBgSize.width}
                    fontSize={15}
                    align={'right'}
                />
                <Text
                    y={45}
                    x={-10}
                    text={sourceExample2}
                    fill={'white'}
                    fontFamily={'Frutiger'}
                    width={radioBgSize.width}
                    fontSize={15}
                    align={'right'}
                />
                <Image
                    x={110}
                    y={12}
                    rotation={90}
                    src={arrowRight}
                    width={80}
                    height={240}
                />
            </Group>
        </Group>
    )
}

Radio.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    nav1Frequency: PropTypes.number.isRequired,
    nav1Distance: PropTypes.number.isRequired,
    nav2Distance: PropTypes.number.isRequired
}

export default Radio

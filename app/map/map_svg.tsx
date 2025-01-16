import {Circle, ClipPath, G, Path, Svg, Text, TSpan} from "react-native-svg";
import React from "react";

export default function MapSvg({screenWidth, MAP_SCALE_FACTOR, rooms}) {

    return (
        <Svg
            viewBox="0 0 944 857"
            width={(screenWidth * 90) / 100 * MAP_SCALE_FACTOR}
            height={((screenWidth * 100) / 100) * (857 / 944) * MAP_SCALE_FACTOR}
            fillRule="evenodd"
            clipRule="evenodd"
            strokeLinecap="round"
            strokeLinejoin="round"
        >

            {/* Kamer 1*/}
            <Path
                d="M173.533 194a9.97 9.97 0 019.967 9.967V306h-100V204.023c0-5.536 4.487-10.023 10.023-10.023h80.01z"
                fill="#0891b2"
            />
            <ClipPath id="a">
                <Path d="M173.533 194a9.97 9.97 0 019.967 9.967V306h-100V204.023c0-5.536 4.487-10.023 10.023-10.023h80.01z" />
            </ClipPath>
            <G clipPath="url(#a)">
                <Text
                    x="104.947px"
                    y="252.941px"
                    fontFamily="'Calibri-Bold','Calibri',sans-serif"
                    fontSize="16px"
                    fontWeight={700}
                    fill="#fff"
                >
                    Kamer {rooms[0].roomNumber.toString()}
                </Text>
                <Text
                    x="102.272px"
                    y="298.8px"
                    fontFamily="'Calibri',sans-serif"
                    fontSize="12px"
                    fill="#fff"
                >
                    {"0/1 (" + rooms[0].maxOccupants.toString() + ")"}
                </Text>
                <Path
                    d="M96.947 299.257c0-2.195-1.807-4.002-4.002-4.002s-4.001 1.807-4.001 4.002"
                    fill="none"
                    fillRule="nonzero"
                    stroke="#fff"
                    strokeWidth="1px"
                />
                <Circle
                    cx={92.945}
                    cy={292.754}
                    r={2.501}
                    fill="none"
                    stroke="#fff"
                    strokeWidth="1px"
                />
                <Path
                    d="M98.947 298.756c0-1.685-1-3.251-2-4.001a2.503 2.503 0 00-.225-4.151"
                    fill="none"
                    fillRule="nonzero"
                    stroke="#fff"
                    strokeWidth="1px"
                />
            </G>
            <Path
                d="M173.533 194a9.97 9.97 0 019.967 9.967V306h-100V204.023c0-5.536 4.487-10.023 10.023-10.023h80.01z"
                fill="none"
                stroke="#374151"
                strokeWidth="1px"
                strokeMiterlimit={1.5}
            />
            {/* ------------------------  */}


            {/* Kamer 2 */}
            <Path
                d="M340.033 194a9.97 9.97 0 019.967 9.967V306H250V204.023c0-5.536 4.487-10.023 10.023-10.023h80.01z"
                fill="#0891b2"
            />
            <ClipPath id="b">
                <Path d="M340.033 194a9.97 9.97 0 019.967 9.967V306H250V204.023c0-5.536 4.487-10.023 10.023-10.023h80.01z" />
            </ClipPath>
            <G clipPath="url(#b)">
                <Text
                    x="271.503px"
                    y="252.941px"
                    fontFamily="'Calibri-Bold','Calibri',sans-serif"
                    fontWeight={700}
                    fontSize="16px"
                    fill="#fff"
                >
                    {"K"}
                    <TSpan x="280.05px 287.948px" y="252.941px 252.941px">
                        {"am"}
                    </TSpan>
                    {"er 2"}
                </Text>
                <Text
                    x="268.828px"
                    y="298.8px"
                    fontFamily="'Calibri',sans-serif"
                    fontSize="12px"
                    fill="#fff"
                >
                    {"0/1 (2)"}
                </Text>
                <Path
                    d="M263.503 299.257c0-2.195-1.807-4.002-4.002-4.002s-4.001 1.807-4.001 4.002"
                    fill="none"
                    fillRule="nonzero"
                    stroke="#fff"
                    strokeWidth="1px"
                />
                <Circle
                    cx={259.501}
                    cy={292.754}
                    r={2.501}
                    fill="none"
                    stroke="#fff"
                    strokeWidth="1px"
                />
                <Path
                    d="M265.503 298.756c0-1.685-1-3.251-2-4.001a2.503 2.503 0 00-.226-4.151"
                    fill="none"
                    fillRule="nonzero"
                    stroke="#fff"
                    strokeWidth="1px"
                />
            </G>
            <Path
                d="M340.033 194a9.97 9.97 0 019.967 9.967V306H250V204.023c0-5.536 4.487-10.023 10.023-10.023h80.01z"
                fill="none"
                stroke="#374151"
                strokeWidth="1px"
                strokeMiterlimit={1.5}
            />
            <Path
                d="M340.033 194a9.97 9.97 0 019.967 9.967V306H250V204.023c0-5.536 4.487-10.023 10.023-10.023h80.01z"
                fill="#000"
                opacity={0.3}
                strokeMiterlimit={1.5}
            />
            {/* ------------------------  */}


            {/* Kamer 3 */}
            <Path
                d="M350 306v112h-90.047a9.956 9.956 0 01-9.953-9.953V306h100z"
                fill="#0891b2"
            />
            <ClipPath id="c">
                <Path d="M350 306v112h-90.047a9.956 9.956 0 01-9.953-9.953V306h100z" />
            </ClipPath>
            <G clipPath="url(#c)">
                <Text
                    x="271.503px"
                    y="362.941px"
                    fontFamily="'Calibri-Bold','Calibri',sans-serif"
                    fontWeight={700}
                    fontSize="16px"
                    fill="#fff"
                >
                    {"K"}
                    <TSpan x="280.05px 287.948px" y="362.941px 362.941px">
                        {"am"}
                    </TSpan>
                    {"er 3"}
                </Text>
                <Text
                    x="268.828px"
                    y="410.8px"
                    fontFamily="'Calibri',sans-serif"
                    fontSize="12px"
                    fill="#fff"
                >
                    {"0/1 (2)"}
                </Text>
                <Path
                    d="M263.503 411.257c0-2.195-1.807-4.002-4.002-4.002s-4.001 1.807-4.001 4.002"
                    fill="none"
                    fillRule="nonzero"
                    stroke="#fff"
                    strokeWidth="1px"
                />
                <Circle
                    cx={259.501}
                    cy={404.754}
                    r={2.501}
                    fill="none"
                    stroke="#fff"
                    strokeWidth="1px"
                />
                <Path
                    d="M265.503 410.756c0-1.685-1-3.251-2-4.001a2.503 2.503 0 00-.226-4.151"
                    fill="none"
                    fillRule="nonzero"
                    stroke="#fff"
                    strokeWidth="1px"
                />
            </G>
            <Path
                d="M350 306v112h-90.047a9.956 9.956 0 01-9.953-9.953V306h100z"
                fill="none"
                stroke="#374151"
                strokeWidth="1px"
                strokeMiterlimit={1.5}
            />
            {/* ------------------------  */}


            {/* Kamer 4 */}
            <Path d="M350 362H450V418H350z" fill="#0891b2" />
            <Text
                x="371.503px"
                y="384.941px"
                fontFamily="'Calibri-Bold','Calibri',sans-serif"
                fontWeight={700}
                fontSize="16px"
                fill="#fff"
            >
                {"K"}
                <TSpan x="380.05px 387.948px" y="384.941px 384.941px">
                    {"am"}
                </TSpan>
                {"er 4"}
            </Text>
            <Path
                d="M364.503 411.257c0-2.195-1.807-4.002-4.002-4.002s-4.001 1.807-4.001 4.002"
                fill="none"
                fillRule="nonzero"
                stroke="#fff"
                strokeWidth="1px"
            />
            <Circle
                cx={360.501}
                cy={404.754}
                r={2.501}
                fill="none"
                stroke="#fff"
                strokeWidth="1px"
            />
            <Path
                d="M366.503 410.756c0-1.685-1-3.251-2-4.001a2.503 2.503 0 00-.226-4.151"
                fill="none"
                fillRule="nonzero"
                stroke="#fff"
                strokeWidth="1px"
            />
            <Text
                x="369.828px"
                y="410.8px"
                fontFamily="'Calibri',sans-serif"
                fontSize="12px"
                fill="#fff"
            >
                {"0/1 (1)"}
            </Text>
            <Path
                d="M350 362H450V418H350z"
                fill="none"
                stroke="#374151"
                strokeWidth="1px"
                strokeMiterlimit={1.5}
            />
            {/* ------------------------  */}


            {/* Kamer 5 */}
            <Path d="M450 362H550V418H450z" fill="#0891b2" />
            <Text
                x="471.503px"
                y="384.941px"
                fontFamily="'Calibri-Bold','Calibri',sans-serif"
                fontWeight={700}
                fontSize="16px"
                fill="#fff"
            >
                {"K"}
                <TSpan x="480.05px 487.948px" y="384.941px 384.941px">
                    {"am"}
                </TSpan>
                {"er 5"}
            </Text>
            <Path
                d="M464.503 411.257c0-2.195-1.807-4.002-4.002-4.002s-4.001 1.807-4.001 4.002"
                fill="none"
                fillRule="nonzero"
                stroke="#fff"
                strokeWidth="1px"
            />
            <Circle
                cx={460.501}
                cy={404.754}
                r={2.501}
                fill="none"
                stroke="#fff"
                strokeWidth="1px"
            />
            <Path
                d="M466.503 410.756c0-1.685-1-3.251-2-4.001a2.503 2.503 0 00-.226-4.151"
                fill="none"
                fillRule="nonzero"
                stroke="#fff"
                strokeWidth="1px"
            />
            <Text
                x="469.828px"
                y="410.8px"
                fontFamily="'Calibri',sans-serif"
                fontSize="12px"
                fill="#fff"
            >
                {"0/1 (1)"}
            </Text>
            <Path
                d="M450 362H550V418H450z"
                fill="none"
                stroke="#374151"
                strokeWidth="1px"
                strokeMiterlimit={1.5}
            />
            <Path
                d="M670.024 362.001c5.509 0 9.976 4.466 9.976 9.976v80.024H550v-90h120.024z"
                fill="#0891b2"
            />
            <ClipPath id="d">
                <Path d="M670.024 362.001c5.509 0 9.976 4.466 9.976 9.976v80.024H550v-90h120.024z" />
            </ClipPath>
            <G clipPath="url(#d)">
                <Text
                    x="587.503px"
                    y="404.941px"
                    fontFamily="'Calibri-Bold','Calibri',sans-serif"
                    fontWeight={700}
                    fontSize="16px"
                    fill="#fff"
                >
                    {"K"}
                    <TSpan x="596.05px 603.948px" y="404.941px 404.941px">
                        {"am"}
                    </TSpan>
                    {"er 6"}
                </Text>
                <Text
                    x="569.828px"
                    y="444.8px"
                    fontFamily="'Calibri',sans-serif"
                    fontSize="12px"
                    fill="#fff"
                >
                    {"0/1 (2)"}
                </Text>
                <Path
                    d="M564.503 445.257c0-2.195-1.807-4.002-4.002-4.002s-4.001 1.807-4.001 4.002"
                    fill="none"
                    fillRule="nonzero"
                    stroke="#fff"
                    strokeWidth="1px"
                />
                <Circle
                    cx={560.501}
                    cy={438.754}
                    r={2.501}
                    fill="none"
                    stroke="#fff"
                    strokeWidth="1px"
                />
                <Path
                    d="M566.503 444.756c0-1.685-1-3.251-2-4.001a2.503 2.503 0 00-.226-4.151"
                    fill="none"
                    fillRule="nonzero"
                    stroke="#fff"
                    strokeWidth="1px"
                />
            </G>
            <Path
                d="M670.024 362.001c5.509 0 9.976 4.466 9.976 9.976v80.024H550v-90h120.024z"
                fill="none"
                stroke="#374151"
                strokeWidth="1px"
                strokeMiterlimit={1.5}
            />
            {/* ------------------------  */}


            <Path
                d="M670.019 541.923c5.509 0 9.976-4.466 9.976-9.976v-80.024h-130v90h120.024z"
                fill="#0891b2"
            />
            <ClipPath id="e">
                <Path d="M670.019 541.923c5.509 0 9.976-4.466 9.976-9.976v-80.024h-130v90h120.024z" />
            </ClipPath>
            <G clipPath="url(#e)">
                <Text
                    x="587.503px"
                    y="494.941px"
                    fontFamily="'Calibri-Bold','Calibri',sans-serif"
                    fontWeight={700}
                    fontSize="16px"
                    fill="#fff"
                >
                    {"K"}
                    <TSpan x="596.05px 603.948px" y="494.941px 494.941px">
                        {"am"}
                    </TSpan>
                    {"er 7"}
                </Text>
                <Text
                    x="569.828px"
                    y="534.8px"
                    fontFamily="'Calibri',sans-serif"
                    fontSize="12px"
                    fill="#fff"
                >
                    {"0/1 (2)"}
                </Text>
                <Path
                    d="M564.503 535.257c0-2.195-1.807-4.002-4.002-4.002s-4.001 1.807-4.001 4.002"
                    fill="none"
                    fillRule="nonzero"
                    stroke="#fff"
                    strokeWidth="1px"
                />
                <Circle
                    cx={560.501}
                    cy={528.754}
                    r={2.501}
                    fill="none"
                    stroke="#fff"
                    strokeWidth="1px"
                />
                <Path
                    d="M566.503 534.756c0-1.685-1-3.251-2-4.001a2.503 2.503 0 00-.226-4.151"
                    fill="none"
                    fillRule="nonzero"
                    stroke="#fff"
                    strokeWidth="1px"
                />
            </G>
            <Path
                d="M670.019 541.923c5.509 0 9.976-4.466 9.976-9.976v-80.024h-130v90h120.024z"
                fill="none"
                stroke="#374151"
                strokeWidth="1px"
                strokeMiterlimit={1.5}
            />
            <Path d="M450 485.931H550V541.931H450z" fill="#0891b2" />
            <Text
                x="470.503px"
                y="508.941px"
                fontFamily="'Calibri-Bold','Calibri',sans-serif"
                fontWeight={700}
                fontSize="16px"
                fill="#fff"
            >
                {"K"}
                <TSpan x="479.05px 486.948px" y="508.941px 508.941px">
                    {"am"}
                </TSpan>
                {"er 8"}
            </Text>
            <Path
                d="M463.503 535.257c0-2.195-1.807-4.002-4.002-4.002s-4.001 1.807-4.001 4.002"
                fill="none"
                fillRule="nonzero"
                stroke="#fff"
                strokeWidth="1px"
            />
            <Circle
                cx={459.501}
                cy={528.754}
                r={2.501}
                fill="none"
                stroke="#fff"
                strokeWidth="1px"
            />
            <Path
                d="M465.503 534.756c0-1.685-1-3.251-2-4.001a2.503 2.503 0 00-.226-4.151"
                fill="none"
                fillRule="nonzero"
                stroke="#fff"
                strokeWidth="1px"
            />
            <Text
                x="468.828px"
                y="534.8px"
                fontFamily="'Calibri',sans-serif"
                fontSize="12px"
                fill="#fff"
            >
                {"0/1 (1)"}
            </Text>
            <Path
                d="M450 485.931H550V541.931H450z"
                fill="none"
                stroke="#374151"
                strokeWidth="1px"
                strokeMiterlimit={1.5}
            />
            <Path d="M350 485.931H450V541.931H350z" fill="#0891b2" />
            <Text
                x="371.503px"
                y="508.941px"
                fontFamily="'Calibri-Bold','Calibri',sans-serif"
                fontWeight={700}
                fontSize="16px"
                fill="#fff"
            >
                {"K"}
                <TSpan x="380.05px 387.948px" y="508.941px 508.941px">
                    {"am"}
                </TSpan>
                {"er 9"}
            </Text>
            <Path
                d="M364.503 535.257c0-2.195-1.807-4.002-4.002-4.002s-4.001 1.807-4.001 4.002"
                fill="none"
                fillRule="nonzero"
                stroke="#fff"
                strokeWidth="1px"
            />
            <Circle
                cx={360.501}
                cy={528.754}
                r={2.501}
                fill="none"
                stroke="#fff"
                strokeWidth="1px"
            />
            <Path
                d="M366.503 534.756c0-1.685-1-3.251-2-4.001a2.503 2.503 0 00-.226-4.151"
                fill="none"
                fillRule="nonzero"
                stroke="#fff"
                strokeWidth="1px"
            />
            <Text
                x="369.828px"
                y="534.8px"
                fontFamily="'Calibri',sans-serif"
                fontSize="12px"
                fill="#fff"
            >
                {"0/1 (1)"}
            </Text>
            <Path
                d="M350 485.931H450V541.931H350z"
                fill="none"
                stroke="#374151"
                strokeWidth="1px"
                strokeMiterlimit={1.5}
            />
            <Path
                d="M250.497 597.929V495.881a9.953 9.953 0 019.951-9.952h90.049v112h-100z"
                fill="#0891b2"
            />
            <ClipPath id="f">
                <Path d="M250.497 597.929V495.881a9.953 9.953 0 019.951-9.952h90.049v112h-100z" />
            </ClipPath>
            <G clipPath="url(#f)">
                <Text
                    x="268.828px"
                    y="590.8px"
                    fontFamily="'Calibri',sans-serif"
                    fontSize="12px"
                    fill="#fff"
                >
                    {"0/1 (2)"}
                </Text>
                <Text
                    x="267.589px"
                    y="542.941px"
                    fontFamily="'Calibri-Bold','Calibri',sans-serif"
                    fontWeight={700}
                    fontSize="16px"
                    fill="#fff"
                >
                    {"K"}
                    <TSpan x="276.135px 284.034px" y="542.941px 542.941px">
                        {"am"}
                    </TSpan>
                    {"er 10"}
                </Text>
                <Path
                    d="M263.503 591.257c0-2.195-1.807-4.002-4.002-4.002s-4.001 1.807-4.001 4.002"
                    fill="none"
                    fillRule="nonzero"
                    stroke="#fff"
                    strokeWidth="1px"
                />
                <Circle
                    cx={259.501}
                    cy={584.754}
                    r={2.501}
                    fill="none"
                    stroke="#fff"
                    strokeWidth="1px"
                />
                <Path
                    d="M265.503 590.756c0-1.685-1-3.251-2-4.001a2.503 2.503 0 00-.226-4.151"
                    fill="none"
                    fillRule="nonzero"
                    stroke="#fff"
                    strokeWidth="1px"
                />
            </G>
            <Path
                d="M250.497 597.929V495.881a9.953 9.953 0 019.951-9.952h90.049v112h-100z"
                fill="none"
                stroke="#374151"
                strokeWidth="1px"
                strokeMiterlimit={1.5}
            />
            <Path
                d="M183.462 653.933H250.462V709.933H183.462z"
                fill="#0891b2"
                stroke="#374151"
                strokeWidth="1px"
                strokeMiterlimit={1.5}
            />
            <Path
                d="M250.497 709.929v-112h100v102.015a9.986 9.986 0 01-9.986 9.985h-90.014z"
                fill="#0891b2"
                stroke="#374151"
                strokeWidth="1px"
                strokeMiterlimit={1.5}
            />
            <Path d="M243.937 654.435H257.308V709.434H243.937z" fill="#0891b2" />
            <Text
                x="205.828px"
                y="702.8px"
                fontFamily="'Calibri',sans-serif"
                fontSize="12px"
                fill="#fff"
            >
                {"0/1 (3)"}
            </Text>
            <Text
                x="267.589px"
                y="654.941px"
                fontFamily="'Calibri-Bold','Calibri',sans-serif"
                fontWeight={700}
                fontSize="16px"
                fill="#fff"
            >
                {"K"}
                <TSpan x="276.135px 284.034px" y="654.941px 654.941px">
                    {"am"}
                </TSpan>
                {"er 11"}
            </Text>
            <Path
                d="M200.503 703.257c0-2.195-1.807-4.002-4.002-4.002s-4.001 1.807-4.001 4.002"
                fill="none"
                fillRule="nonzero"
                stroke="#fff"
                strokeWidth="1px"
            />
            <Circle
                cx={196.501}
                cy={696.754}
                r={2.501}
                fill="none"
                stroke="#fff"
                strokeWidth="1px"
            />
            <Path
                d="M202.503 702.756c0-1.685-1-3.251-2-4.001a2.503 2.503 0 00-.226-4.151"
                fill="none"
                fillRule="nonzero"
                stroke="#fff"
                strokeWidth="1px"
            />
            <Path
                d="M93.623 709.934a10.114 10.114 0 01-10.114-10.114V557.934h100v152H93.623z"
                fill="#0891b2"
            />
            <ClipPath id="g">
                <Path d="M93.623 709.934a10.114 10.114 0 01-10.114-10.114V557.934h100v152H93.623z" />
            </ClipPath>
            <G clipPath="url(#g)">
                <Text
                    x="102.828px"
                    y="700.8px"
                    fontFamily="'Calibri',sans-serif"
                    fontSize="12px"
                    fill="#fff"
                >
                    {"0/1 (3)"}
                </Text>
                <Text
                    x="101.589px"
                    y="626.941px"
                    fontFamily="'Calibri-Bold','Calibri',sans-serif"
                    fontWeight={700}
                    fontSize="16px"
                    fill="#fff"
                >
                    {"K"}
                    <TSpan x="110.135px 118.034px" y="626.941px 626.941px">
                        {"am"}
                    </TSpan>
                    {"er 12"}
                </Text>
                <Path
                    d="M97.503 701.257c0-2.195-1.807-4.002-4.002-4.002s-4.001 1.807-4.001 4.002"
                    fill="none"
                    fillRule="nonzero"
                    stroke="#fff"
                    strokeWidth="1px"
                />
                <Circle
                    cx={93.501}
                    cy={694.754}
                    r={2.501}
                    fill="none"
                    stroke="#fff"
                    strokeWidth="1px"
                />
                <Path
                    d="M99.503 700.756c0-1.685-1-3.251-2-4.001a2.503 2.503 0 00-.226-4.151"
                    fill="none"
                    fillRule="nonzero"
                    stroke="#fff"
                    strokeWidth="1px"
                />
            </G>
            <Path
                d="M93.623 709.934a10.114 10.114 0 01-10.114-10.114V557.934h100v152H93.623z"
                fill="none"
                stroke="#374151"
                strokeWidth="1px"
                strokeMiterlimit={1.5}
            />
            <Path d="M83.543 501.754H183.543V557.754H83.543z" fill="#0891b2" />
            <Text
                x="101.503px"
                y="526.941px"
                fontFamily="'Calibri-Bold','Calibri',sans-serif"
                fontWeight={700}
                fontSize="16px"
                fill="#fff"
            >
                {"K"}
                <TSpan x="110.05px 117.948px" y="526.941px 526.941px">
                    {"am"}
                </TSpan>
                {"er 13"}
            </Text>
            <G>
                <Path
                    d="M96.503 553.257c0-2.195-1.807-4.002-4.002-4.002s-4.001 1.807-4.001 4.002"
                    fill="none"
                    fillRule="nonzero"
                    stroke="#fff"
                    strokeWidth="1px"
                />
                <Circle
                    cx={92.501}
                    cy={546.754}
                    r={2.501}
                    fill="none"
                    stroke="#fff"
                    strokeWidth="1px"
                />
                <Path
                    d="M98.503 552.756c0-1.685-1-3.251-2-4.001a2.503 2.503 0 00-.226-4.151"
                    fill="none"
                    fillRule="nonzero"
                    stroke="#fff"
                    strokeWidth="1px"
                />
            </G>
            <Text
                x="101.828px"
                y="552.8px"
                fontFamily="'Calibri',sans-serif"
                fontSize="12px"
                fill="#fff"
            >
                {"0/1 (1)"}
            </Text>
            <Path
                d="M83.543 501.754H183.543V557.754H83.543z"
                fill="none"
                stroke="#374151"
                strokeWidth="1px"
                strokeMiterlimit={1.5}
            />
            <Path d="M83.5 402H147.748V501.817H83.5z" fill="#e7e7e7" />
            <Text
                x="101.112px"
                y="456.316px"
                fontFamily="'Arial-BoldMT','Arial',sans-serif"
                fontWeight={700}
                fontSize="16px"
                fill="#374151"
            >
                {"Lift"}
            </Text>
            <Path
                d="M83.5 402H147.748V501.817H83.5z"
                fill="none"
                stroke="#374151"
                strokeWidth="1px"
                strokeMiterlimit={1.5}
            />
            <Path
                d="M183.5 305.834v86.207c0 5.519-4.474 9.993-9.993 9.993H83.5v-96.2h100z"
                fill="#e7e7e7"
            />
            <ClipPath id="h">
                <Path d="M183.5 305.834v86.207c0 5.519-4.474 9.993-9.993 9.993H83.5v-96.2h100z" />
            </ClipPath>
            <G clipPath="url(#h)">
                <Text
                    x="100.481px"
                    y="446.632px"
                    transform="matrix(1 0 0 1 8.388 -95.532)"
                    fontFamily="'Arial-BoldMT','Arial',sans-serif"
                    fontWeight={700}
                    fontSize="16px"
                    fill="#374151"
                >
                    {"Lunch"}
                </Text>
                <Text
                    x="100.481px"
                    y="463.155px"
                    transform="matrix(1 0 0 1 8.388 -95.532)"
                    fontFamily="'Arial-BoldMT','Arial',sans-serif"
                    fontWeight={700}
                    fontSize="16px"
                    fill="#374151"
                >
                    {"Room"}
                </Text>
            </G>
            <Path
                d="M183.5 305.834v86.207c0 5.519-4.474 9.993-9.993 9.993H83.5v-96.2h100z"
                fill="none"
                stroke="#374151"
                strokeWidth="1px"
                strokeMiterlimit={1.5}
            />
        </Svg>
    );
}
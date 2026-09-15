import PropTypes from 'prop-types'
import './RainDrop.scss'

// Gravity acceleration on Earth, in meters per second squared.
const GRAVITY = 9.81

// Air density at sea level around 15 °C, in kg/m³.
const AIR_DENSITY = 1.225

// Water density used to convert a drop mass into volume, in kg/m³.
const WATER_DENSITY = 1000

// Drag coefficient used by the air-resistance formula.
const RAINDROP_DRAG_COEFFICIENT = 0.6

// Visible UI drops are heavier than tiny mist droplets.
const MIN_RAINDROP_MASS_GRAMS = 0.03
const MAX_RAINDROP_MASS_GRAMS = 0.05

// Horizontal wind speed used to tilt the rain trajectory.
const WIND_SPEED = 2.2

// Conversion from real-world speed to screen-space speed.
const PIXELS_PER_METER = 140

// Approximate vertical distance a drop travels during one CSS animation cycle.
const SCREEN_TRAVEL_PIXELS = 900

// Visual constraints.
const FIXED_HEIGHT = 72
const FIXED_WIDTH = 3
const MIN_DEPTH = 1
const MAX_DEPTH = 5
const MIN_ANGLE = 6
const MAX_ANGLE = 16
const MIN_DURATION = 0.85
const MAX_DURATION = 2.4

function clamp (value, min, max) {
    return Math.min(Math.max(value, min), max)
}

RainDrop.propTypes = {
    angle: PropTypes.number,
    delay: PropTypes.number,
    depth: PropTypes.number,
    duration: PropTypes.number,
    height: PropTypes.number,
    seed: PropTypes.number,
    width: PropTypes.number,
}

function normalize (value, min, max) {
    return (value - min) / (max - min)
}

function deterministicRandom (seed, salt) {
    const value = Math.sin((seed + 1) * 12.9898 + salt * 78.233) * 43758.5453
    return value - Math.floor(value)
}

function deterministicRange (seed, salt, min, max) {
    return min + deterministicRandom(seed, salt) * (max - min)
}

function gramsToKilograms (grams) {
    return grams / 1000
}

function getSphereVolumeFromMass (massKg) {
    return massKg / WATER_DENSITY
}

function getRadiusFromSphereVolume (volumeM3) {
    return Math.cbrt((3 * volumeM3) / (4 * Math.PI))
}

function getCrossSectionalArea (radiusMeters) {
    return Math.PI * radiusMeters ** 2
}

function getGravityForce (massKg) {
    return massKg * GRAVITY
}

function getTerminalVelocity ({ areaM2, massKg }) {
    return Math.sqrt(
        (2 * massKg * GRAVITY) /
        (AIR_DENSITY * areaM2 * RAINDROP_DRAG_COEFFICIENT),
    )
}

function getRainAngleDegrees ({ fallSpeed, windSpeed }) {
    return Math.atan(windSpeed / fallSpeed) * (180 / Math.PI)
}

function getAnimationDurationSeconds (terminalVelocity) {
    const fallSpeedPixelsPerSecond = terminalVelocity * PIXELS_PER_METER
    return clamp(
        SCREEN_TRAVEL_PIXELS / fallSpeedPixelsPerSecond,
        MIN_DURATION,
        MAX_DURATION,
    )
}

function createRaindropPhysicsModel (seed) {
    const massGrams = deterministicRange(
        seed,
        1,
        MIN_RAINDROP_MASS_GRAMS,
        MAX_RAINDROP_MASS_GRAMS,
    )

    const massKg = gramsToKilograms(massGrams)
    const volumeM3 = getSphereVolumeFromMass(massKg)
    const radiusMeters = getRadiusFromSphereVolume(volumeM3)
    const areaM2 = getCrossSectionalArea(radiusMeters)

    const gravityForce = getGravityForce(massKg)
    const terminalVelocity = getTerminalVelocity({ areaM2, massKg })

    const angleDegrees = getRainAngleDegrees({
        fallSpeed: terminalVelocity,
        windSpeed: WIND_SPEED,
    })

    const massRatio = normalize(
        massGrams,
        MIN_RAINDROP_MASS_GRAMS,
        MAX_RAINDROP_MASS_GRAMS,
    )

    const depth = Math.round(clamp(MIN_DEPTH + massRatio * 4, MIN_DEPTH, MAX_DEPTH))
    const height = FIXED_HEIGHT
    const width = FIXED_WIDTH
    const duration = getAnimationDurationSeconds(terminalVelocity)
    const angle = clamp(angleDegrees, MIN_ANGLE, MAX_ANGLE)
    const drift = Math.tan((angle * Math.PI) / 180) * SCREEN_TRAVEL_PIXELS

    return {
        angle,
        areaM2,
        depth,
        drift,
        duration,
        gravityForce,
        height,
        massGrams,
        massKg,
        radiusMeters,
        terminalVelocity,
        volumeM3,
        width,
    }
}

export default function RainDrop ({
    angle,
    delay = 0,
    depth,
    duration,
    height,
    seed = 1,
    width,
}) {
    const physics = createRaindropPhysicsModel(seed)

    const safeAngle = clamp(angle ?? physics.angle, MIN_ANGLE, MAX_ANGLE)
    const safeDelay = Math.max(delay, 0)
    const safeDepth = clamp(depth ?? physics.depth, MIN_DEPTH, MAX_DEPTH)
    const safeDuration = clamp(duration ?? physics.duration, MIN_DURATION, MAX_DURATION)
    const safeHeight = clamp(height ?? physics.height, FIXED_HEIGHT, FIXED_HEIGHT)
    const safeWidth = clamp(width ?? physics.width, FIXED_WIDTH, FIXED_WIDTH)

    return (
        <span
            aria-hidden='true'
            className='rain-drop'
            style={{
                '--rain-drop-angle': `-${safeAngle}deg`,
                '--rain-drop-delay': `-${safeDelay}s`,
                '--rain-drop-depth': safeDepth,
                '--rain-drop-drift': `${physics.drift}px`,
                '--rain-drop-duration': `${safeDuration}s`,
                '--rain-drop-height': `${safeHeight}px`,
                '--rain-drop-width': `${safeWidth}px`,
            }}
        />
    )
}

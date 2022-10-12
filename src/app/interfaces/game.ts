export interface Room {
    name: String,
    description: String,
    items: Item[],
    connections: any,
    visited: Boolean
}

export interface Item {
    name: String,
    code: String,
    description: String,
    type: String,
    power: Number,
    slot: String,
    size: Number
}

export interface Equip {
    name: String,
    code: String,
    description: String,
    slot: String,
    stats: Stats,
    cost: ResourceAmount[],
    id: Number
}

export interface Stats {
    maxHealth: Number,
    power: Number,
    defence: Number
}

export interface Connection {
    direction: String, //East, south, up, down, etc. >go direction
    room: Room
}

export interface Player {
    name: String,
    description: String,
    location: Room,
    inventory: Item[],
    gear: PlayerEquipment,
    resources: any,
    discoveredResources: any,
    level: Number,
    experience: Number,
    nextExperience: Number,
    health: Number,
    maxHealth: Number,
    power: Number,
    defence: Number,
    maxResource: Number
}

export interface PlayerEquipment {
    head: Equip,
    eyes: Equip,
    torso: Equip,
    legs: Equip,
    waist: Equip,
    back: Equip,
    leftHand: Equip,
    rightHand: Equip,
    leftFinger: Equip,
    rightFinger: Equip
}

export interface ResourceAmount {
    type: String,
    amount: Number
}

export interface Enemy {
    init: Boolean,
    name: String,
    description: String,
    type: String,
    health: Number,
    maxHealth: Number,
    power: Number,
    defence: Number,
    multiplier: Number,
    rewards: {
        resources: ResourceAmount[],
        experience: Number,
        money: Number
    }
}

export interface EnemyGroup {
    enemies: Enemy[]
}

export interface Machine {
    name: String,
    description: String,
    power: Number,
    type: String
}

export interface Floor {
    safe: Boolean,
    groups: EnemyGroup[],
    enemies: Enemy[],
    machines: Machine[]
}

export interface House {
    height: Number,
    floors: Floor[]
}

export const EnemyBaseStats = {
    'Imp': {
        'name': 'Imp',
        'description': '',
        'type': '',
        'health': 20,
        'maxHealth': 20,
        'power': 10,
        'defence': 5,
        'multiplier': 1,
        'rewards': {
            'resources': [{
                'type': 'Build',
                'amount': 5
            }],
            'experience': 5,
            'money': 10
        }
    },
    'Ogre': {
        'name': 'Ogre',
        'description': '',
        'type': '',
        'health': 300,
        'maxHealth': 300,
        'power': 100,
        'defence': 50,
        'multiplier': 1,
        'rewards': {
            'resources': [{
                'type': 'Build',
                'amount': 100
            }],
            'experience': 50,
            'money': 100
        }
    }
}

export const ResourceTypes = [
    'Amber',
    'Amethyst',
    'Blood',
    'Caulk',
    'Chalk',
    'Cobalt',
    'Copper',
    'Diamond',
    'Emerald',
    'Frosting',
    'Garnet',
    'Gold',
    'Iodine',
    'Jet',
    'Malachite',
    'Marble',
    'Mercury',
    'Obsidian',
    'Opal',
    'Polychromite',
    'Quartz',
    'Rainbow',
    'Redstone',
    'Rock Candy',
    'Rose Quartz',
    'Ruby',
    'Rust',
    'Shale',
    'Star Sapphire',
    'Sulfur',
    'Sunstone',
    'Tar',
    'Titanium',
    'Topaz',
    'Uranium',
]
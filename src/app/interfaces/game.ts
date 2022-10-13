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

export const ResourceColors = {
    'Amber': [[236, 211, 0]],
    'Amethyst': [[117, 0, 220]],
    'Blood': [[252, 1, 1]],
    'Caulk': [[126, 126, 126]],
    'Chalk': [[255, 255, 255]],
    'Cobalt': [[0, 73, 208]],
    'Copper': [[217, 77, 1]],
    'Diamond': [[192, 209, 248]],
    'Emerald': [[46, 247, 94]],
    'Frosting': [[255, 138, 255]],
    'Garnet': [[182, 1, 2]],
    'Gold': [[255, 255, 16]],
    'Iodine': [[182, 82, 0]],
    'Jet': [[91, 91, 91]],
    'Malachite': [[3, 84, 34]],
    'Marble': [[252, 224, 249]],
    'Mercury': [[166, 166, 170]],
    'Obsidian': [[46, 46, 46]],
    'Opal': [[166, 219, 250], 
    [101, 205, 253], 
    [184, 253, 189], 
    [254, 201, 255]],
    'Polychromite': [[255, 142, 145],
    [254, 136, 111],
    [247, 158, 51],
    [208, 164, 25],
    [156, 183, 34],
    [112, 177, 39],
    [75, 200, 63],
    [27, 192, 129],
    [24, 185, 186],
    [63, 192, 195],
    [91, 171, 255],
    [161, 203, 243],
    [224, 128, 193],
    [255, 125, 192]],
    'Quartz': [[181, 255, 234]],
    'Rainbow': [[224, 224, 0],
    [224, 160, 192],
    [87, 146, 255],
    [255, 117, 20],
    [0, 224, 128]],
    'Redstone': [[255, 113, 19]],
    'Rock Candy': [[237, 130, 255]],
    'Rose Quartz': [[254, 58, 120]],
    'Ruby': [[255, 87, 71]],
    'Rust': [[127, 47, 30]],
    'Shale': [[133, 21, 214]],
    'Star Sapphire': [[122, 125, 253]],
    'Sulfur': [[227, 184, 0]],
    'Sunstone': [[224, 160, 64]],
    'Tar': [[1, 1, 1]],
    'Titanium': [[215, 215, 215]],
    'Topaz': [[255, 235, 194]],
    'Uranium': [[24, 255, 53]],
}
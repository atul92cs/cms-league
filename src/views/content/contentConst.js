export const fieldActions=[
    {
        type:'view',
        
    },
    {
        type:'edit'
    },
    {
        type:'status'
    }
];

export const displayedColumns=[
    {
        header:'id',
        type:'text',
        value:'id'
    },
    {
        header:'heading',
        type:'text',
        value:'heading'
    },
    {
        header:'tournament',
        type:'text',
        value:'tournamentid'
    },
    {
        header:'description',
        type:'content',
        value:'description'
    },
    {
        header:'status',
        type:'enum_icon',
        value:'status'
    }
]
const Posts = [
  {
    user: {
      name: 'John',
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp3KkKgrgsKm4OZvKdal8MQA6QsZOW20hNxzxCx2r0yU1qB2ctEuoGaEf0LZWxRrkKwk8&usqp=CAU'
    },
    post: {
      content: 'Hello world',
      images: [
        'https://booking.pystravel.vn/uploads/posts/albums/5590/cba5d2113c9873a78cf3339cb36ce75d.jpg',
      ],
      time: '10h',
      reacts: {
        like: [
          '123',
          '456'
        ],
        sad: [
          '1233'
        ],
      },
      comments: [
        {
          user: '123',
          comment: 'This comment !1'
        },
        {
          user: '456',
          comment: 'This comment !2'
        },
      ]

    }
  },
  {
    user: {
      name: 'Nhớ +',
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp3KkKgrgsKm4OZvKdal8MQA6QsZOW20hNxzxCx2r0yU1qB2ctEuoGaEf0LZWxRrkKwk8&usqp=CAU'
    },
    post: {
      content: 'IQ vô cực mới hiểu',
      images: [
        'https://i1-dulich.vnecdn.net/2021/07/16/1-1626437591.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=BWzFqMmUWVFC1OfpPSUqMA',
      ],
      time: '4h',
      reacts: {
        like: [
          '123',
          '456',
          '45622'
        ],
        sad: [
          '1233'
        ],
      },
      comments: [
        {
          user: '123',
          comment: 'This comment !1'
        },
        {
          user: '456',
          comment: 'This comment !2'
        },
      ]

    }
  } 
]

export default Posts
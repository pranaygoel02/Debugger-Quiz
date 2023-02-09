const questionSet = [
    {
        id: 1,
        code: "```js\n \
        let arr = [10, 20, 30, 40];\n \
        \n \
        function modifyArray(arr) {\n \
          for (let i = 0; i < arr.length; i++) {\n \
            arr[i] *= 2;\n \
          }\n \
          arr = [100, 200, 300];\n \
        }\n \
        \n \
        modifyArray(arr);\n \
        console.log(arr);\n \```",
        
        options: ['[100, 200, 300]','[20, 40, 60, 80]','[10, 20, 30, 40]','An error'],
        answer: '[20, 40, 60, 80]'
    },
    {
        id: 2,
        code: 'Heya',
        options: ['A','B','C','D'],
        answer: 'A'
    },
    {
        id: 3,
        code: 'Heya',
        options: ['A','B','C','D'],
        answer: 'C'
    },
    {
        id: 4,
        code: 'Heya',
        options: ['A','B','C','D'],
        answer: 'A'
    },
]

export {questionSet}
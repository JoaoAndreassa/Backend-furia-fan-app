module.exports = {
    testEnvironment: "node", // Assegura que o Jest está configurado para o ambiente Node
    transform: {
      "^.+\\.tsx?$": "ts-jest", // Transforma arquivos TS/TSX
    },
    testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  };
  
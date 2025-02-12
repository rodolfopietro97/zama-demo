// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract OnchainRiddle {
    address public bot;
    string public riddle;
    bytes32 private answerHash;
    address public winner;
    bool public isActive;

    event RiddleSet(string riddle);
    // @NOTE: add riddle data to the event
    event AnswerAttempt(
        address indexed user,
        bool correct,
        string riddle,
        string answer
    );
    // @NOTE: add winner data to the event
    event Winner(address indexed user, string riddle, string answer);

    modifier onlyBot() {
        require(msg.sender == bot, "Only bot can call this function");
        _;
    }

    constructor() {
        bot = msg.sender;
    }

    function setRiddle(
        string memory _riddle,
        bytes32 _answerHash
    ) external onlyBot {
        require(!isActive, "Riddle already active");
        riddle = _riddle;
        answerHash = _answerHash;
        isActive = true;
        winner = address(0);
        emit RiddleSet(_riddle);
    }

    function submitAnswer(string memory _answer) external {
        require(isActive, "No active riddle");
        require(winner == address(0), "Riddle already solved");

        if (keccak256(abi.encodePacked(_answer)) == answerHash) {
            winner = msg.sender;
            isActive = false;
            emit Winner(msg.sender, riddle, _answer);
        }

        emit AnswerAttempt(msg.sender, winner == msg.sender, riddle, _answer);
    }
}

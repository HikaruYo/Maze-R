import React, { useState, useEffect, useRef } from 'react';
import backgroundImg from '../assets/background.png';
import '../css/stage1.css';

function Stage1() {
    const canvasRef = useRef(null);
    const [player, setPlayer] = useState({ x: 1, y: 1, size: 40 });
    const [playerXp, setPlayerXp] = useState(0);
    const [playerLevel, setPlayerLevel] = useState(1);
    const [maze, setMaze] = useState([
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1, 0, 3, 0, 0, 2],
        [1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
        [1, 0, 1, 0, 0, 3, 1, 0, 0, 1],
        [1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 1, 0, 1],
        [1, 1, 1, 0, 1, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 3, 0, 3, 1, 0, 1],
        [1, 1, 1, 1, 1, 1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ]);
    const tileSize = 50;

    // Load background image
    const background = new Image();
    background.src = backgroundImg;

    const drawMaze = (ctx) => {
        for (let row = 0; row < maze.length; row++) {
            for (let col = 0; col < maze[row].length; col++) {
                if (maze[row][col] === 1) {
                    ctx.fillStyle = 'rgba(0, 0, 0, 1)'; // Wall
                } else if (maze[row][col] === 0) {
                    ctx.fillStyle = 'rgba(255, 255, 255, 1)'; // Path
                } else if (maze[row][col] === 2) {
                    ctx.fillStyle = 'rgba(255, 0, 255, 1)'; // Finish
                } else if (maze[row][col] === 3) {
                    ctx.fillStyle = 'rgba(25, 100, 255, 1)'; // Monster
                }
                ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
            }
        }
    };

    const drawPlayer = (ctx) => {
        ctx.fillStyle = 'red';
        ctx.fillRect(player.x * tileSize + 5, player.y * tileSize + 5, player.size, player.size);
    };

    const movePlayer = (dx, dy) => {
        const newX = player.x + dx;
        const newY = player.y + dy;

        if (maze[newY][newX] === 0) {
            setPlayer({ ...player, x: newX, y: newY });
        } else if (maze[newY][newX] === 2) {
            alert('Finish!');
            window.location.reload();
        } else if (maze[newY][newX] === 3) {
            let input = prompt("1 + 1?");
            if (input === "2") {
                // Create a copy of the maze array
                const newMaze = [...maze];
                newMaze[newY][newX] = 0; // Killing the monster
                setMaze(newMaze); // Update maze state
                setPlayer({ ...player, x: newX, y: newY });
                setPlayerXp(playerXp + 2); // Add XP
            }
        }
    };

    const levelUp = () => {
        const requiredXpToLevel2 = 2;
        const requiredXpToLevel3 = 5;

        if (playerLevel === 1 && playerXp >= requiredXpToLevel2) {
            setPlayerLevel(2);
            setPlayerXp(playerXp - requiredXpToLevel2);
        } else if (playerLevel === 2 && playerXp >= requiredXpToLevel3) {
            setPlayerLevel(3);
            setPlayerXp(playerXp - requiredXpToLevel3);
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const updateGame = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
            drawMaze(ctx);
            drawPlayer(ctx);
            levelUp();
        };

        updateGame();

        const handleKeyDown = (event) => {
            switch (event.key) {
                case 'ArrowUp':
                case 'w':
                    movePlayer(0, -1);
                    break;
                case 'ArrowDown':
                case 's':
                    movePlayer(0, 1);
                    break;
                case 'ArrowLeft':
                case 'a':
                    movePlayer(-1, 0);
                    break;
                case 'ArrowRight':
                case 'd':
                    movePlayer(1, 0);
                    break;
                default:
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [player, playerXp, playerLevel, maze]);

    return (
        <>
            <canvas ref={canvasRef} id="mazeCanvas" width="500" height="500"></canvas>
            <center>
                <p id="text" style={{ color: "white" }}>Done</p>
                <p id="level">Level = {playerLevel}</p>
            </center>
        </>
    );
}

export default Stage1;

let warriors = [
    { id: "W001", name: "Musashi", class: "Samurai", attack: 85, defense: 60 },
    { id: "W002", name: "Ragnar", class: "Viking", attack: 92, defense: 70 },
    { id: "W003", name: "Spartacus", class: "Gladiator", attack: 80, defense: 65 },
    { id: "W004", name: "Lancelot", class: "Knight", attack: 75, defense: 85 },
    { id: "W005", name: "Leonidas", class: "Spartan", attack: 88, defense: 72 }
];

console.table(warriors);

const displayMenu = () => {
    return +prompt(`
    === ANCIENT WARRIORS GUILD - QUẢN LÝ GUILD ===
    1. Hiển thị danh sách chiến binh hiện tại
    2. Thêm chiến binh mới
    3. Xóa chiến binh
    4. Cập nhật thông tin chiến binh
    5. Tìm kiếm chiến binh (theo tên hoac class)
    6. Tính tổng sức mạnh guild (attack + defense)
    7. Sắp xếp danh sách theo attack
    8. Kiểm tra độ cân bang guild theo class
    9. Mô phỏng trận chiến 1v1
    0. Thoát chương trình
    
     Mời bạn nhập chức năng:   
    `
    );
};

const displayListWarriors = (listWarrior) => {
    listWarrior.forEach((hero) => {
        alert(`
            id: ${hero.id}
            name: ${hero.name}
            class: ${hero.class}
            attack: ${hero.attack}
            defense: ${hero.defense}
        `);
    });
};

const addWarrior = (listWarrior) => {
    const validClasses = ['Samurai', 'Viking', 'Gladiator', 'Ninja', 'Knight', 'Spartan'];

    let newId = prompt("Mời bạn nhập ID chiến binh:");

    let existId = listWarrior.find((warrior) => {
        return warrior.id === newId.trim();
    });
    if (existId) {
        alert("ID chiến binh đã tồn tại trong guild.");
        return;
    } else if (newId === undefined || newId.trim() === "") {
        alert("ID chiến binh không được để trống.");
        return;
    }

    let newName = prompt("Mời bạn nhập tên chiến binh:");

    let existName = listWarrior.find((warrior) => {
        return warrior.name.toLowerCase().trim() === newName.toLowerCase().trim();
    });
    if (existName) {
        alert("Tên chiến binh đã có trong guild.");
        return;
    } else if (newName === undefined || newName.trim() === "") {
        alert("Tên chiến binh không được để trống.");
        return;
    }

    let newAttack = +prompt("Mời nhập chỉ số tấn công (1 - 100):");

    if (isNaN(newAttack) || newAttack < 1 || newAttack > 100) {
        alert("Chỉ số tấn công không hợp lệ. Attack phải từ 1 đến 100.");
        return;
    }

    let newDefense = +prompt("Mời nhập chỉ số phòng thủ (>= 0):");

    if (isNaN(newDefense) || newDefense < 0) {
        alert("Chỉ số phòng thủ không thỏa mãn. Defense phải là số và lớn hơn hoặc bằng 0.");
        return;
    }

    let newClass = prompt(`Mời bạn nhập lớp chiến binh (${validClasses.join(", ")}):`);

    if (!validClasses.includes(newClass)) {
        alert(`Class không hợp lệ. Class phải là một trong: ${validClasses.join(", ")}.`);
        return;
    }

    let newWarrior = {
        id: newId,
        name: newName,
        class: newClass,
        attack: newAttack,
        defense: newDefense,
    };

    listWarrior.push(newWarrior);
    alert(`Đã thêm chiến binh: ${newWarrior.name} vào guild!`);
};


const deleteWarrior = (nameWarrior, listWarrior) => {
    let index = listWarrior.findIndex((warrior) => {
        return warrior.name.toLowerCase().trim() === nameWarrior.toLowerCase().trim();
    });

    if (index === -1) {
        alert("Không tìm thấy chiến binh");
    } else {
        let confirmDelete = prompt("Yêu cầu xác nhận (yes/no)");

        if (confirmDelete && confirmDelete.toLowerCase().trim() === "yes") {
            let deletedWarrior = listWarrior.splice(index, 1);
            alert(`Đã xóa chiến binh ${deletedWarrior[0].name} thành công!`);
        } else {
            alert("Đã hủy thao tác xóa.");
        }
    }
};

const updateWarrior = (nameWarrior, listWarrior) => {
    let findWarrior = listWarrior.find((warrior) => {
        return warrior.name.toLowerCase().trim() === nameWarrior.toLowerCase().trim();
    });
    if (findWarrior === undefined) {
        alert(`Chiến binh ${nameWarrior} không có trong guild!`)
    } else {
        let updateAttack = +prompt(`Mời cập nhật chỉ số tấn công (chỉ số tấn công hiện tại: ${findWarrior.attack}):`);
        if (isNaN(updateAttack) || updateAttack < 1 || updateAttack > 100) {
            alert(`Chỉ số tấn công không hợp lệ. Attack phải từ 1 đến 100.`);
        } else {
            findWarrior.attack = updateAttack;
            alert(`Đã cập nhật chỉ số tấn công cho chiến binh: ${findWarrior.name}`)
        }

        let updateDefense = +prompt(`Mời cập nhật chỉ số phòng thủ (chỉ số phòng thủ hiện tại: ${findWarrior.defense}): `);
        if (isNaN(updateDefense) || updateDefense < 0) {
            alert(`Chỉ số phòng thủ không hợp lệ. Defense phải lớn hơn hoặc bằng 0.`);
        } else {
            findWarrior.defense = updateDefense;
            alert(`Đã cập nhật chỉ số phòng thủ cho chiến binh: ${findWarrior.name}`)
        }
    }
};

const searchWarrior = (listWarrior) => {
    let choice = prompt("Tìm kiếm theo (name/class):");

    if (!choice || choice.trim() === "") {
        alert("Vui lòng nhập name hoặc class.");
        return;
    }

    choice = choice.toLowerCase().trim();

    if (choice === "name") {
        let searchName = prompt("Nhập tên chiến binh cần tìm:");

        if (!searchName || searchName.trim() === "") {
            alert("Tên không được để trống.");
            return;
        }

        let findWarriorByName = listWarrior.find((warrior) => {
            return warrior.name.toLowerCase().trim() === searchName.toLowerCase().trim();
        });
        if (findWarriorByName === undefined) {
            alert(`Không tìm thấy chiến binh nào tên ${searchName}.`);
        } else {
            alert(`Chiến binh: ${findWarriorByName.name}, Class: ${findWarriorByName.class}, Attack: ${findWarriorByName.attack}, Defense: ${findWarriorByName.defense}`);
        }
    } else if (choice === "class") {
        let searchClass = prompt("Nhập class cần tìm:");

        if (!searchClass || searchClass.trim() === "") {
            alert("Class không được để trống.");
            return;
        }

        let findWarriorByClass = listWarrior.filter((warrior) => {
            return warrior.class.toLowerCase().trim() === searchClass.toLowerCase().trim();
        });
       
        if (findWarriorByClass.length === 0) {
            alert(`Không có chiến binh nào thuộc class ${searchClass}.`);
        } else {
            let result = "Danh sách chiến binh:\n";

            findWarriorByClass.forEach((warrior) => {
                result += `- ${warrior.name}, Attack: ${warrior.attack}, Defense: ${warrior.defense}\n`;
            });

            alert(result);
        }
    } else {
        alert("Lựa chọn không hợp lệ. Vui lòng nhập name hoặc class.");
    }
};

const sortWarriors = (listWarrior) => {
    let order = prompt("Sắp xếp theo thứ tự (asc / desc):");
    if (!order || (order.trim().toLowerCase() !== "asc" && order.trim().toLowerCase() !== "desc")) {
        alert("Lựa chọn không hợp lệ. Vui lòng nhập asc hoặc desc.");
        return;
    }
    order = order.trim().toLowerCase();

    let sortedList = [...listWarrior].sort((a, b) => {
        return order === "asc" ? a.attack - b.attack : b.attack - a.attack;
    });

    let result = `Danh sách chiến binh (${order === "asc" ? "tăng dần" : "giảm dần"} theo attack):\n`;
    sortedList.forEach((warrior) => {
        result += `- [${warrior.id}] ${warrior.name} | Class: ${warrior.class} | Attack: ${warrior.attack} | Defense: ${warrior.defense}\n`;
    });
    alert(result);
};


const totalStrongGuild = (listWarrior) => {
    let totalAttack = listWarrior.reduce((total, warrior) => {
        return (total + warrior.attack);
    }, 0);
    let totalDefense = listWarrior.reduce((total, warrior) => {
        return (total + warrior.defense);
    }, 0);
    const message = `Tổng sức mạnh guild hiện tại: Tổng attack: ${totalAttack} | Tổng defense: ${totalDefense}`;
    alert(message);
};



let choice;
let running = true;

while(running) {
    choice = displayMenu();
        switch(choice) {
        case 1:
            displayListWarriors(warriors);
            break;
        case 2: 
            addWarrior(warriors);
            break;
        case 3:
            let deleteNameWarrior = prompt("Mời nhập tên chiến binh:");
            deleteWarrior(deleteNameWarrior, warriors);
            break;
        case 4:
            let updateNameWarrior = prompt("Mời nhập tên chiến binh:");
            updateWarrior(updateNameWarrior, warriors);
            break;
        case 5: 
            searchWarrior(warriors);
            break;
        case 6:
            totalStrongGuild(warriors);
            break;
        case 7:
            sortWarriors(warriors);
            break;
        case 8:
            checkClassBalance(warriors);
            break;
        case 9:
            simulateBattle(warriors);
            break;
        case 0:
            alert("Cảm ơn bạn đã sử dụng ANCIENT WARRIORS GUILD! Hẹn gặp lại!");
            running = false;
            break;
        default:
            alert("Lựa chọn không hợp lệ! Vui lòng nhập số từ 0 đến 9.");
            break;
    }
}
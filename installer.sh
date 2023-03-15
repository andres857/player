#!/bin/bash
# Author: Tasos Latsas

read -p 'user: ' user
PLAYER_DIR="/home/$user/player"
function _spinner() {
    # $1 start/stop
    #
    # on start: $2 display message
    # on stop : $2 process exit status
    #           $3 spinner function pid (supplied from stop_spinner)

    local on_success="DONE"
    local on_fail="FAIL"
    local white="\e[1;37m"
    local green="\e[1;32m"
    local red="\e[1;31m"
    local nc="\e[0m"

    case $1 in
        start)
            # calculate the column where spinner and status msg will be displayed
            let column=$(tput cols)-${#2}-8
            # display message and position the cursor in $column column
            echo -ne ${2}
            printf "%${column}s"

            # start spinner
            i=1
            sp='\|/-'
            delay=${SPINNER_DELAY:-0.15}

            while :
            do
                printf "\b${sp:i++%${#sp}:1}"
                sleep $delay
            done
            ;;
        stop)
            if [[ -z ${3} ]]; then
                echo "spinner is not running.."
                exit 1
            fi

            kill $3 > /dev/null 2>&1

            # inform the user uppon success or failure
            echo -en "\b["
            if [[ $2 -eq 0 ]]; then
                echo -en "${green}${on_success}${nc}"
            else
                echo -en "${red}${on_fail}${nc}"
            fi
            echo -e "]"
            ;;
        *)
            echo "invalid argument, try {start/stop}"
            exit 1
            ;;
    esac
}

function start_spinner {
    # $1 : msg to display
    _spinner "start" "${1}" &
    # set global spinner pid
    _sp_pid=$!
    disown
}

function stop_spinner {
    # $1 : command exit status
    _spinner "stop" $1 $_sp_pid
    unset _sp_pid
}

echo 'Reproductor de video 1.0 📺'

# start_spinner '- 📥 Obteniendo y configurando el acceso ssh'
#     if test -e /home/$user/.ssh ;then
#         echo "path exist"
#     else
#         echo "create path"
#         mkdir /home/$user/.ssh 
#     fi

#     if [ -f "/home/pi/.ssh/authorized_keys" ]; then
#     # Si el archivo existe, mostrar un mensaje
#     echo "key found"
#     else
#     # Si no existe, mostrar otro mensaje
#     wget -O /home/$user/.ssh/authorized_keys https://assets-players.sfo3.digitaloceanspaces.com/key_public_players/id_rsa.pub
#     fi
# stop_spinner $?

# start_spinner '- 📔 Actualizando el sistema y Instalando Dependencias'
#     sudo apt update -yq
#     sudo apt upgrade -yq  
#     sudo apt install unclutter imagemagick -yq 
#     sudo apt install raspberrypi-kernel-headers -yq
#     sudo apt autoremove -yqs
# stop_spinner $?

# start_spinner '- 📔 Instalando Nodejs'
#     #Comprobamos si Node está instalado
#     if ! command -v node >/dev/null 2>&1; then
#         echo "Node no está instalado"
#         echo "Instalando la version 14 de Node"
#         curl -sL https://deb.nodesource.com/setup_14.x | sudo bash -s    
#         sudo apt-get install -y nodejs
#         else
#         echo "Node ya esta instalado"
#     fi
# stop_spinner $?

# start_spinner '- 📥 Instalando librerias'
#     cd "$PLAYER_DIR"
#     touch "$PLAYER_DIR/player.log" && touch "$PLAYER_DIR/status.log"
#     cp "$PLAYER_DIR/.env.example" "$PLAYER_DIR/.env"
#     chown $user: "$PLAYER_DIR/.env"
#     chown $user: "$PLAYER_DIR/player.log"
#     chown $user: "$PLAYER_DIR/status.log"
#     chmod +x "$PLAYER_DIR/app.js" && chmod +x "$PLAYER_DIR/run_on_boot.sh"
#     npm i > /dev/null 2>&1
# stop_spinner $?

# start_spinner '- 📥 creacion de archivos para limpiar el sistema de logs periodicamente'
#     echo "#!/bin/bash 
# cat /dev/null > /home/$user/player/player.log 
# sleep 5
# cat /dev/null > /home/$user/player/status.log " > /home/$user/player/clearlogs.sh
#     chown $user: "$PLAYER_DIR/clearlogs.sh"
#     chmod +x $PLAYER_DIR/clearlogs.sh
# stop_spinner $?

# start_spinner '- 📥 Se anaden tareas para limpiar el contenido de logs'
#     echo "0 0 1 * * $user /home/$user/player/clearlogs.sh" > /etc/crontab
# stop_spinner $?

start_spinner '- 📥 Configurando el reinicio programado y la tarea de inicio del reproductor multimedia'
    mkdir /home/$user/.config/autostart
      echo "[Desktop Entry]
  Type=Application
  Name=mediaplayer
  Exec=/usr/bin/bash /home/$user/player/run_on_boot.sh" > /home/$user/.config/autostart/mediaplayer.desktop
  chown $user: -R "/home/$user/.config/autostart"
stop_spinner $?


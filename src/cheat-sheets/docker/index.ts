import type { CheatSheetDefinition } from '@/types'
import { createElement } from 'react'
import { CubeIcon } from '@heroicons/react/24/outline'

export const dockerCheatSheet: CheatSheetDefinition = {
  id: 'docker',
  title: 'Docker',
  description: 'Essential Docker commands, Dockerfile syntax, and container management tips',
  category: 'DevOps',
  tags: ['docker', 'containers', 'devops', 'deployment', 'dockerfile', 'compose'],
  lastUpdated: '2025-10-04',
  icon: createElement(CubeIcon),
  sections: [
    {
      title: 'Basic Commands',
      items: [
        {
          title: 'Check Docker Version',
          code: 'docker --version',
          description: 'Display Docker version information'
        },
        {
          title: 'Docker System Info',
          code: 'docker info',
          description: 'Display system-wide information'
        },
        {
          title: 'Help',
          code: 'docker --help',
          description: 'Show help for Docker commands',
          example: 'docker run --help (for specific command help)'
        },
        {
          title: 'List Docker Objects',
          code: 'docker system df',
          description: 'Show Docker disk usage'
        },
        {
          title: 'Clean Up System',
          code: 'docker system prune',
          description: 'Remove unused data (containers, networks, images)'
        }
      ]
    },
    {
      title: 'Image Management',
      items: [
        {
          title: 'List Images',
          code: 'docker images',
          description: 'Show all local images',
          example: 'docker images -a (include intermediate images)'
        },
        {
          title: 'Pull Image',
          code: 'docker pull <image>:<tag>',
          description: 'Download image from registry',
          example: 'docker pull nginx:latest'
        },
        {
          title: 'Build Image',
          code: 'docker build -t <name>:<tag> .',
          description: 'Build image from Dockerfile',
          example: 'docker build -t myapp:v1.0 .'
        },
        {
          title: 'Remove Image',
          code: 'docker rmi <image-id>',
          description: 'Remove one or more images',
          example: 'docker rmi $(docker images -q) (remove all)'
        },
        {
          title: 'Tag Image',
          code: 'docker tag <image> <new-tag>',
          description: 'Create tag for image',
          example: 'docker tag myapp:latest myapp:v1.0'
        },
        {
          title: 'Push Image',
          code: 'docker push <image>:<tag>',
          description: 'Upload image to registry',
          example: 'docker push username/myapp:latest'
        },
        {
          title: 'Image History',
          code: 'docker history <image>',
          description: 'Show image layer history'
        },
        {
          title: 'Inspect Image',
          code: 'docker inspect <image>',
          description: 'Display detailed image information'
        }
      ]
    },
    {
      title: 'Container Lifecycle',
      items: [
        {
          title: 'Run Container',
          code: 'docker run <image>',
          description: 'Create and start container',
          example: 'docker run -d -p 80:80 nginx (detached with port mapping)'
        },
        {
          title: 'List Running Containers',
          code: 'docker ps',
          description: 'Show running containers',
          example: 'docker ps -a (include stopped containers)'
        },
        {
          title: 'Stop Container',
          code: 'docker stop <container-id>',
          description: 'Stop running container gracefully'
        },
        {
          title: 'Start Container',
          code: 'docker start <container-id>',
          description: 'Start stopped container'
        },
        {
          title: 'Restart Container',
          code: 'docker restart <container-id>',
          description: 'Restart container'
        },
        {
          title: 'Kill Container',
          code: 'docker kill <container-id>',
          description: 'Force stop container'
        },
        {
          title: 'Remove Container',
          code: 'docker rm <container-id>',
          description: 'Delete stopped container',
          example: 'docker rm $(docker ps -aq) (remove all stopped)'
        },
        {
          title: 'Container Logs',
          code: 'docker logs <container-id>',
          description: 'Fetch container logs',
          example: 'docker logs -f <container> (follow logs)'
        }
      ]
    },
    {
      title: 'Container Interaction',
      items: [
        {
          title: 'Execute Command',
          code: 'docker exec -it <container> <command>',
          description: 'Run command in running container',
          example: 'docker exec -it myapp bash'
        },
        {
          title: 'Attach to Container',
          code: 'docker attach <container-id>',
          description: 'Attach to running container'
        },
        {
          title: 'Copy Files',
          code: 'docker cp <container>:<src> <dest>',
          description: 'Copy files between container and host',
          example: 'docker cp myapp:/app/logs ./logs'
        },
        {
          title: 'Container Stats',
          code: 'docker stats',
          description: 'Display live resource usage statistics'
        },
        {
          title: 'Inspect Container',
          code: 'docker inspect <container>',
          description: 'Display detailed container information'
        },
        {
          title: 'Container Processes',
          code: 'docker top <container>',
          description: 'Display running processes in container'
        }
      ]
    },
    {
      title: 'Docker Run Options',
      items: [
        {
          title: 'Detached Mode',
          code: 'docker run -d <image>',
          description: 'Run container in background'
        },
        {
          title: 'Interactive Mode',
          code: 'docker run -it <image>',
          description: 'Run container interactively with terminal'
        },
        {
          title: 'Port Mapping',
          code: 'docker run -p <host-port>:<container-port> <image>',
          description: 'Map host port to container port',
          example: 'docker run -p 8080:80 nginx'
        },
        {
          title: 'Volume Mount',
          code: 'docker run -v <host-path>:<container-path> <image>',
          description: 'Mount host directory in container',
          example: 'docker run -v /data:/app/data myapp'
        },
        {
          title: 'Environment Variables',
          code: 'docker run -e <KEY>=<value> <image>',
          description: 'Set environment variables',
          example: 'docker run -e NODE_ENV=production myapp'
        },
        {
          title: 'Container Name',
          code: 'docker run --name <name> <image>',
          description: 'Assign name to container',
          example: 'docker run --name web-server nginx'
        },
        {
          title: 'Auto Remove',
          code: 'docker run --rm <image>',
          description: 'Automatically remove container when it exits'
        },
        {
          title: 'Resource Limits',
          code: 'docker run --memory=<limit> --cpus=<limit> <image>',
          description: 'Set memory and CPU limits',
          example: 'docker run --memory=512m --cpus=1.5 myapp'
        }
      ]
    },
    {
      title: 'Dockerfile Basics',
      items: [
        {
          title: 'Base Image',
          code: 'FROM <image>:<tag>',
          description: 'Set base image for build',
          example: 'FROM node:18-alpine'
        },
        {
          title: 'Working Directory',
          code: 'WORKDIR /app',
          description: 'Set working directory for subsequent instructions'
        },
        {
          title: 'Copy Files',
          code: 'COPY <src> <dest>',
          description: 'Copy files from host to container',
          example: 'COPY package*.json ./'
        },
        {
          title: 'Run Commands',
          code: 'RUN <command>',
          description: 'Execute commands during build',
          example: 'RUN npm install --production'
        },
        {
          title: 'Expose Port',
          code: 'EXPOSE <port>',
          description: 'Document which port the container listens on',
          example: 'EXPOSE 3000'
        },
        {
          title: 'Default Command',
          code: 'CMD ["executable", "param1", "param2"]',
          description: 'Default command when container starts',
          example: 'CMD ["npm", "start"]'
        },
        {
          title: 'Entry Point',
          code: 'ENTRYPOINT ["executable", "param1"]',
          description: 'Configure container as executable'
        },
        {
          title: 'Environment Variables',
          code: 'ENV <key>=<value>',
          description: 'Set environment variables',
          example: 'ENV NODE_ENV=production'
        }
      ]
    },
    {
      title: 'Docker Compose',
      items: [
        {
          title: 'Start Services',
          code: 'docker-compose up',
          description: 'Start services defined in docker-compose.yml',
          example: 'docker-compose up -d (detached mode)'
        },
        {
          title: 'Stop Services',
          code: 'docker-compose down',
          description: 'Stop and remove containers, networks'
        },
        {
          title: 'Build Services',
          code: 'docker-compose build',
          description: 'Build or rebuild services'
        },
        {
          title: 'View Logs',
          code: 'docker-compose logs',
          description: 'View output from services',
          example: 'docker-compose logs -f web (follow logs for web service)'
        },
        {
          title: 'List Services',
          code: 'docker-compose ps',
          description: 'List containers for services'
        },
        {
          title: 'Execute Command',
          code: 'docker-compose exec <service> <command>',
          description: 'Execute command in running service',
          example: 'docker-compose exec web bash'
        },
        {
          title: 'Scale Services',
          code: 'docker-compose up --scale <service>=<num>',
          description: 'Scale service to specified number of containers'
        }
      ]
    },
    {
      title: 'Networking',
      items: [
        {
          title: 'List Networks',
          code: 'docker network ls',
          description: 'Show all Docker networks'
        },
        {
          title: 'Create Network',
          code: 'docker network create <network-name>',
          description: 'Create new network',
          example: 'docker network create --driver bridge mynet'
        },
        {
          title: 'Connect Container',
          code: 'docker network connect <network> <container>',
          description: 'Connect container to network'
        },
        {
          title: 'Disconnect Container',
          code: 'docker network disconnect <network> <container>',
          description: 'Disconnect container from network'
        },
        {
          title: 'Inspect Network',
          code: 'docker network inspect <network>',
          description: 'Display detailed network information'
        },
        {
          title: 'Remove Network',
          code: 'docker network rm <network>',
          description: 'Remove one or more networks'
        }
      ]
    },
    {
      title: 'Volume Management',
      items: [
        {
          title: 'List Volumes',
          code: 'docker volume ls',
          description: 'Show all Docker volumes'
        },
        {
          title: 'Create Volume',
          code: 'docker volume create <volume-name>',
          description: 'Create new volume'
        },
        {
          title: 'Inspect Volume',
          code: 'docker volume inspect <volume>',
          description: 'Display detailed volume information'
        },
        {
          title: 'Remove Volume',
          code: 'docker volume rm <volume>',
          description: 'Remove one or more volumes'
        },
        {
          title: 'Remove Unused Volumes',
          code: 'docker volume prune',
          description: 'Remove all unused volumes'
        },
        {
          title: 'Use Volume in Container',
          code: 'docker run -v <volume>:<path> <image>',
          description: 'Mount named volume in container',
          example: 'docker run -v mydata:/data postgres'
        }
      ]
    },
    {
      title: 'Best Practices',
      items: [
        {
          title: 'Multi-stage Builds',
          description: 'Use multiple FROM statements to reduce image size',
          example: 'Build stage for compilation, runtime stage for execution'
        },
        {
          title: 'Layer Caching',
          description: 'Order Dockerfile instructions for optimal caching',
          example: 'Copy package.json first, then npm install, then source code'
        },
        {
          title: 'Minimal Base Images',
          description: 'Use Alpine Linux or distroless images',
          example: 'node:18-alpine instead of node:18'
        },
        {
          title: 'Health Checks',
          code: 'HEALTHCHECK --interval=30s --timeout=3s CMD curl -f http://localhost/ || exit 1',
          description: 'Add health checks to containers'
        },
        {
          title: 'Non-root User',
          code: 'USER 1000:1000',
          description: 'Run container as non-root user for security'
        },
        {
          title: 'Docker Ignore',
          description: 'Use .dockerignore to exclude unnecessary files',
          example: 'node_modules\n.git\n*.log'
        }
      ]
    }
  ]
}
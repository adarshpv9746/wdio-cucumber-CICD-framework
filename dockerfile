FROM node:16.20

# Install dependencies
RUN apt-get update && apt-get install -y \
    curl \
    xvfb \
    openjdk-11-jre \
    wget \
    fonts-liberation \
    libcairo2 \
    libgbm1 \
    libgtk-3-0 \
    libpango-1.0-0 \
    libu2f-udev \
    libvulkan1 \
    libxdamage1 \
    libxkbcommon0 \
    xdg-utils

#installing chrome
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && dpkg -i google-chrome-stable_current_amd64.deb 


#seting JAVA_HOME
ENV JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64
ENV PATH=$JAVA_HOME/bin:$PATH

#setup Secret Key (crypt-js)
ARG SECRET_KEY
ENV SECRET_KEY=$SECRET_KEY

#setup variables for automation script
ENV ENV=tst
ENV BROWSER=chrome
ENV REPORT=cucumber
ENV SUITE=default-scenarios.csv

# Set up virtual display with Xvfb
ENV DISPLAY=:99
RUN Xvfb :99 -screen 0 1920x1080 &

# Copy the project files
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .

# Run the automation script
RUN chmod +x execute.sh
CMD xvfb-run ./execute.sh "$ENV" "$BROWSER" "$REPORT"
#CMD [ "xvfb-run", "./execute.sh", "tst", "firefox", "cucumber"]

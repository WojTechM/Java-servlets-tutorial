package com.codecool.servlets;

import com.codecool.servletHelper.StaticFileManager;

import javax.imageio.ImageIO;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.io.OutputStream;

public class ImageServlet extends HttpServlet {

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {

        response.setContentType("image/jpeg");

        String pathToWeb = getServletContext().getRealPath(File.separator);
        File f = new File(pathToWeb + StaticFileManager.preparePath(request.getRequestURI()));
        BufferedImage bi = ImageIO.read(f);
        OutputStream out = response.getOutputStream();
        ImageIO.write(bi, "png", out);
        out.close();
    }

}

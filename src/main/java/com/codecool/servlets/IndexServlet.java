package com.codecool.servlets;

import com.codecool.servletHelper.StaticFileManager;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class IndexServlet extends HttpServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String htmlResponse = StaticFileManager.loadFileAsStringByPath(request, "/html/index.html");
        response.getWriter().write(htmlResponse);
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String projectName = request.getParameter("projectName");
        response.sendRedirect("/static/html/" + projectName + ".html");
    }
}
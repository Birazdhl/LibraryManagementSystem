using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Repo;
using Application.ViewModel;
using Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class BookController : ControllerBase
    {

        private IBookRepository _bookService;

        public BookController(IBookRepository bookService)
        {
            this._bookService = bookService;
        }

        [HttpGet]
        public async Task<ActionResult<List<BooksViewModel>>> GetBookList()
        {
            var result = await _bookService.GetBookList();
            return Ok(result);
        }

        [HttpGet]
        public async Task<ActionResult<List<Books>>> GetBook()
        {
            var result = await _bookService.GetBooks();
            return Ok(result);
        }

    }
}
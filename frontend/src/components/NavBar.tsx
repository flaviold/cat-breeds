import { alpha, AppBar, Box, InputBase, styled, Toolbar, Typography } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search'
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

function NavBar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate()
  const [ searchParams ] = useSearchParams()
  const q = searchParams.get('q')

  const handleSearch = (event: any) => {
    if (event.key !== 'Enter' || !query) return;

    navigate(`/search?q=${query}`)
  }

  useEffect(() => {
    setQuery(q ?? '')
  }, [q])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography onClick={() => navigate('/')} variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer' }}>
            Cats
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleSearch}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NavBar